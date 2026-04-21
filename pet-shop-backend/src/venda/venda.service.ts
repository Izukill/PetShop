import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, VendaStatus } from '@prisma/client';

@Injectable()
export class VendaService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        
        const totalProdutos = this.calcularTotalProdutos(createVendaDto.itens);
        const totalServicos = await this.calcularTotalServicos(createVendaDto.servicoslookupId, tx);
        const valorFinal = totalProdutos + totalServicos;

        const novaVenda = await tx.venda.create({
          data: {
            valorTotal: valorFinal,
            data: new Date(),
            status: createVendaDto.status,
          
            cliente: { 
              connect: { lookupId: createVendaDto.clientelookupId } 
            },

            itens: {
              create: createVendaDto.itens?.map((item) => ({
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                produto: { connect: { lookupId: item.produtolookupId } },
              })) || [],
            },

            servicos: createVendaDto.servicoslookupId?.length > 0 
              ? { connect: createVendaDto.servicoslookupId.map(id => ({ lookupId: id })) } 
              : undefined,
          },
        });

        //baixa do estoque na venda
        if (createVendaDto.itens && createVendaDto.itens.length > 0) {
          for (const item of createVendaDto.itens) {
            await tx.produto.update({
              where: { lookupId: item.produtolookupId },
              data: {
                quantidade: { decrement: item.quantidade } 
              }
            });
          }
        }

        return await tx.venda.findUnique({
          where: { lookupId: novaVenda.lookupId },
          include: { itens: true, servicos: true, cliente: true },
        });
      });

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Erro de vínculo. Verifique se o Cliente, Produtos ou Serviços realmente existem.`);
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.venda.findMany({
      include: {
        itens: true,
        servicos: true,
        cliente: true,
      },
      orderBy: { data: 'desc' }
    });
  }

  async findOne(lookupId: string) {
    const venda = await this.prisma.venda.findUnique({
      where: { lookupId: lookupId },
      include: {
        itens: true,
        servicos: true,
        cliente: true,
      },
    });

    if (!venda) {
      throw new NotFoundException(`Venda não encontrada.`);
    }

    return venda;
  }

  async update(lookupId: string, updateVendaDto: UpdateVendaDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {

        const vendaAtual = await tx.venda.findUnique({
          where: { lookupId },
          include: { itens: true }
        });

        if (!vendaAtual) {
          throw new NotFoundException(`Venda não encontrada.`);
        }

        //lógica de estoque
        if (updateVendaDto.status === VendaStatus.CANCELADA && vendaAtual.status !== VendaStatus.CANCELADA) {
          await this.executarLogicaCancelamento(lookupId, tx);
        } else if (updateVendaDto.status === VendaStatus.CONCLUIDA && vendaAtual.status === VendaStatus.CANCELADA) {
          await this.executarLogicaReativacao(lookupId, tx);
        }

        return await tx.venda.update({
          where: { lookupId: lookupId },
          data: { status: updateVendaDto.status },
        });
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }

  async remove(lookupId: string) {
    return this.update(lookupId, { status: VendaStatus.CANCELADA } as UpdateVendaDto);
  }

  //funções auxiliares
  
  private calcularTotalProdutos(itens: any[] | undefined): number {
    if (!itens || itens.length === 0) return 0;
    return itens.reduce(
      (acc, item) => acc + (item.precoUnitario * item.quantidade), 
      0
    );
  }

  private async calcularTotalServicos(servicosLookupId: string[] | undefined, tx: any): Promise<number> {
    if (!servicosLookupId || servicosLookupId.length === 0) return 0;

    const servicos = await tx.servico.findMany({
      where: { lookupId: { in: servicosLookupId } }
    });

    if (servicos.length !== servicosLookupId.length) {
      throw new NotFoundException('Um ou mais serviços informados não foram encontrados no banco de dados.');
    }

    return servicos.reduce((acc, servico) => acc + Number(servico.precoUnitario), 0);
  }


  private async executarLogicaCancelamento(vendaLookupId: string, tx: any) {
    await tx.venda.update({
      where: { lookupId: vendaLookupId },
      data: { servicos: { set: [] } } 
    });

    //puxa a venda com os produtos nela
    const venda = await tx.venda.findUnique({
      where: { lookupId: vendaLookupId },
      include: { itens: { include: { produto: true } } }
    });

    //devolver produtos para o estoque
    if (venda && venda.itens) {
      for (const item of venda.itens) {
        await tx.produto.update({
          where: { lookupId: item.produto.lookupId }, 
          data: { quantidade: { increment: item.quantidade } }
        });
      }
    }
  }

  //se a venda for reativada, os produtos são descontados do estoque
  private async executarLogicaReativacao(vendaLookupId: string, tx: any) {
    const venda = await tx.venda.findUnique({
      where: { lookupId: vendaLookupId },
      include: { itens: { include: { produto: true } } }
    });

    if (venda && venda.itens) {
      for (const item of venda.itens) {
        await tx.produto.update({
          where: { lookupId: item.produto.lookupId },
          data: { quantidade: { decrement: item.quantidade } }
        });
      }
    }
  }
}