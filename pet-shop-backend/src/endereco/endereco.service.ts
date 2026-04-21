import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EnderecoService {

  constructor(private readonly prisma: PrismaService) {}


  async create(createEnderecoDto: CreateEnderecoDto) {

    try {
      return await this.prisma.endereco.create({
        data: {
          rua: createEnderecoDto.rua,
          numero: createEnderecoDto.numero,
          cep: createEnderecoDto.cep,
          complemento: createEnderecoDto.complemento,
          casa: {
            connect: { lookupId: createEnderecoDto.clientelookupId }
          }
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Não é possível cadastrar endereço. Cliente com lookupId ${createEnderecoDto.clientelookupId} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async findAll() {
    return await this.prisma.endereco.findMany({ 
      include: {
        casa: true,
      },
    });
  }

  async findOne(lookupId: string) {
    const endereco = await this.prisma.endereco.findUnique({
      where: {lookupId: lookupId},
      include: {
        casa: true,
      },
    });

    if(!endereco){
      throw new NotFoundException(`Endereço com lookupId ${lookupId} não encontrado.`);
    }

    return endereco;
  }

  async update(lookupId: string, updateEnderecoDto: UpdateEnderecoDto) {
    try{
      return await this.prisma.endereco.update({
        where: {lookupId: lookupId},
        data: {
          rua: updateEnderecoDto.rua,
          numero: updateEnderecoDto.numero,
          cep: updateEnderecoDto.cep,
          complemento: updateEnderecoDto.complemento,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Endereço com lookupId ${lookupId} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async remove(lookupId: string) {
    try{
      return await this.prisma.endereco.delete({
        where: {lookupId: lookupId},
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Endereço com lookupId ${lookupId} não encontrado.`);
        }
      }
      throw error; 
    }
  }
}
