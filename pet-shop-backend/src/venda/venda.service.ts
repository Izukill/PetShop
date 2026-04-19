import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VendaService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        
        const totalProdutos = this.calcularTotalProdutos(createVendaDto.itens);
        const totalServicos = await this.calcularTotalServicos(createVendaDto.servicosId, tx);
        const valorFinal = totalProdutos + totalServicos;

        const novaVenda = await tx.venda.create({
          data: {
            valorTotal: valorFinal,
            data: new Date(),
            clienteId: createVendaDto.clienteId,
            itens: {
              create: createVendaDto.itens?.map((item) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
              })) || [],
            },
            
          },
        });

        await this.vincularServicos(createVendaDto.servicosId, novaVenda.id, tx);

        if (createVendaDto.itens && createVendaDto.itens.length > 0) {
          for (const item of createVendaDto.itens) {
            await tx.produto.update({
              where: { id: item.produtoId },
              data: {
                quantidade: { decrement: item.quantidade } 
              }
            });
          }
        }

        return await tx.venda.findUnique({
          where: { id: novaVenda.id },
          include: { itens: true, servicos: true, cliente: true },
        });
      });

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new NotFoundException(`Erro de vínculo. Verifique se o Cliente e os Produtos realmente existem.`);
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
    });
  }

  async findOne(id: number) {
    try{
      return await this.prisma.venda.findUnique({
        where: {id: id},
        include: {
          itens: true,
          servicos: true,
          cliente: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
        }
      }
      throw error;
    }
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    try{
      return await this.prisma.venda.update({
        where: {id: id},
        data: {
          status: updateVendaDto.status
        },
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const vendaCancelada = await tx.venda.update({
          where: { id },
          data: { 
            status: 'CANCELADA' 
          },
        });
        await tx.servico.updateMany({
          where: { vendaId: id },
          data: { vendaId: null }
        });

        const itensDaVenda = await tx.itemVenda.findMany({
          where: { vendaId: id }
        });
      
        for (const item of itensDaVenda) {
          await tx.produto.update({
            where: { id: item.produtoId },
            data: {
              quantidade: { increment: item.quantidade }
            }
          });
        }

        return vendaCancelada;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Venda #${id} não encontrada.`);
      }
      throw error;
    }
  }


  //Funções auxiliares de create 

  private calcularTotalProdutos(itens: any[] | undefined): number {
    if (!itens || itens.length === 0) return 0;
    
    return itens.reduce(
      (acc, item) => acc + (item.precoUnitario * item.quantidade), 
      0
    );
  }

  private async calcularTotalServicos(servicosId: number[] | undefined, tx: any): Promise<number> {
    if (!servicosId || servicosId.length === 0) return 0;

    const servicos = await tx.servico.findMany({
      where: { id: { in: servicosId } }
    });

    if (servicos.length !== servicosId.length) {
      throw new NotFoundException('Um ou mais serviços informados não foram encontrados no banco de dados.');
    }

    return servicos.reduce((acc, servico) => acc + Number(servico.precoUnitario), 0);
  }

  private async vincularServicos(servicosId: number[] | undefined, vendaId: number, tx: any): Promise<void> {
    if (!servicosId || servicosId.length === 0) return;

    await tx.servico.updateMany({
      where: { id: { in: servicosId } },
      data: { vendaId: vendaId },
    });
  }

  private async executarLogicaCancelamento(vendaId: number, tx: any) {
    await tx.servico.updateMany({
      where: { vendaId: vendaId },
      data: { vendaId: null }
    });

    const itens = await tx.itemVenda.findMany({ where: { vendaId: vendaId } });
    for (const item of itens) {
      await tx.produto.update({
        where: { id: item.produtoId },
        data: { quantidade: { increment: item.quantidade } }
      });
    }
  }

  private async executarLogicaReativacao(vendaId: number, tx: any) {
    const itens = await tx.itemVenda.findMany({ where: { vendaId: vendaId } });
    for (const item of itens) {
      await tx.produto.update({
        where: { id: item.produtoId },
        data: { quantidade: { decrement: item.quantidade } }
      });
    }
  }
}
