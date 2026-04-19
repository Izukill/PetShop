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

  async findOne(id: number) {
    try{
      return await this.prisma.cliente.findUnique({
        where: {
          id: id,
        },
        include: {
          pessoa: true,
        },
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {

    try{
      return await this.prisma.cliente.update({
        where: { id: id },
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
          throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async remove(id: number) {

    try{
      return await this.prisma.cliente.update({
        where: { id: id },
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
          throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  } 
}
