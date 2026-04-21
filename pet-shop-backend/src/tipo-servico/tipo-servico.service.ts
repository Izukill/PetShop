import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoServicoDto } from './dto/create-tipo-servico.dto';
import { UpdateTipoServicoDto } from './dto/update-tipo-servico.dto';
import { PrismaService } from '../prisma/prisma.service';	
import { Prisma } from '@prisma/client';

@Injectable()
export class TipoServicoService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createTipoServicoDto: CreateTipoServicoDto) {
    
    const novoTipoServico = await this.prisma.tipoServico.create({
      data: {
        nome: createTipoServicoDto.nome,
        descricao: createTipoServicoDto.descricao,
        preco: createTipoServicoDto.preco,
      },
    });

    return novoTipoServico;

  }

  async findAll() {
    return await this.prisma.tipoServico.findMany();
  }

  async findOne(lookupId: string) {
    const tipoServico = await this.prisma.tipoServico.findUnique({
      where: {lookupId: lookupId},
    });

    if(!tipoServico){
      throw new NotFoundException(`Tipo de serviço com lookupId ${lookupId} não encontrado.`);
    }

    return tipoServico;
  }

  async update(lookupId: string, updateTipoServicoDto: UpdateTipoServicoDto) {
    try{
      return await this.prisma.tipoServico.update({
        where: {lookupId: lookupId},
        data: {
          nome: updateTipoServicoDto.nome,
          descricao: updateTipoServicoDto.descricao,
          preco: updateTipoServicoDto.preco,
        },
      });
    } catch (error){
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2025') {
          throw new NotFoundException(`Tipo de serviço com lookupId ${lookupId} não encontrado.`);
        }
      }
    }
  }

  async remove(lookupId: string) {
    try{
      await this.prisma.tipoServico.update({
        where: {lookupId: lookupId},
        data: {
          ativo: false,
        }
      });
    }catch (error){
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2025') {
          throw new NotFoundException(`Tipo de serviço com lookupId ${lookupId} não encontrado.`);
        }
      }
    }
  }
}
