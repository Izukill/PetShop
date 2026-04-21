import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClienteService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    const novoCliente = await this.prisma.cliente.create({
      data:{
        numero: createClienteDto.numero,
        //criando a instância de pessoa dentro do clienteService
        pessoa: {
          create: {
            nome: createClienteDto.nome,
            email: createClienteDto.email,
            dataCadastro: new Date(),
          },
        },
      },
      include: {
        pessoa: true,
      },
    });

    return novoCliente;
  }
    
  async findAll() {
    return await this.prisma.cliente.findMany({
      include: {
        pessoa: true,
      },
    });
  }

  async findOne(lookupId: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { lookupId: lookupId }, 
      include: {
        pessoa: true,
      },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente não encontrado.`);
    }

    return cliente;
  }

  // 2. ALTERADO: Recebe lookupId
  async update(lookupId: string, updateClienteDto: UpdateClienteDto) {
    try{
      return await this.prisma.cliente.update({
        where: { lookupId: lookupId },
        data: {
          numero: updateClienteDto.numero,
          pessoa: {
            update: {
              nome: updateClienteDto.nome,
              email: updateClienteDto.email,
            },
          },
        },
        include: {
          pessoa: true,
        },
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Cliente não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async remove(lookupId: string) {
    try{
      return await this.prisma.cliente.update({
        where: { lookupId: lookupId },
        data:{
          pessoa: {
            update:{
              ativo: false,
            }
          }
        },
        include: { pessoa: true }
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Cliente não encontrado.`);
        }
      }
      throw error; 
    }
  } 
}