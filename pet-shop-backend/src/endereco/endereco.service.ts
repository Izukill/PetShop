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
          clienteId: createEnderecoDto.clienteId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(`Não é possível cadastrar endereço. Cliente com ID ${createEnderecoDto.clienteId} não encontrado.`);
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

  async findOne(id: number) {
    try{
      return await this.prisma.endereco.findUnique({
        where: {id: id},
        include: {
          casa: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    try{
      return await this.prisma.endereco.update({
        where: {id: id},
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
          throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.endereco.delete({
        where: {id: id},
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }
}
