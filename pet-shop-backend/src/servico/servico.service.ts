import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ServicoService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createServicoDto: CreateServicoDto) {

    try{
      const novoServico = await this.prisma.servico.create({
        data: {
          status: createServicoDto.status,
          observacao: createServicoDto.observacao,
          precoUnitario: createServicoDto.precoUnitario,
          tipoServicoId: createServicoDto.tipoServicoId,
          funcionarioId: createServicoDto.funcionarioId,
          petId: createServicoDto.petId,
          dataAgendamento: createServicoDto.dataAgendamento,
        },
      });
  
      return novoServico;
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(`Não é possível cadastrar serviço. Tipo de serviço, funcionário ou pet não encontrado.`);
        }
      }
      throw error;
    }
    
  }

  async findAll() {
    return await this.prisma.servico.findMany({
      include: {
        tipoServico: true,
        funcionario: {
          include: {
            pessoa: true,
          },
        },
        pet: true,
      },
    });
  }

  async findOne(id: number) {
    try{
      return await this.prisma.servico.findUnique({
        where: {id: id},
        include: {
          tipoServico: true,
          funcionario: {
            include: {
              pessoa: true,
            },
          },
          pet: true,
        },
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
        }
      }
    }
  }

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    try{
      return await this.prisma.servico.update({
        where: {id: id},
        data: {
          status: updateServicoDto.status,
          observacao: updateServicoDto.observacao,
          precoUnitario: updateServicoDto.precoUnitario,
          tipoServicoId: updateServicoDto.tipoServicoId,
          funcionarioId: updateServicoDto.funcionarioId,
          petId: updateServicoDto.petId,
          dataAgendamento: updateServicoDto.dataAgendamento,
        },
        include: {
          tipoServico: true,
          funcionario: {
            include: {
              pessoa: true,
            },
          },
          pet: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Serviço com ID ${id} não encontrado para atualização.`);
        } else if (error.code === 'P2003') {
          throw new NotFoundException(`Não é possível atualizar serviço. Tipo de serviço, funcionário ou pet não encontrado.`);
        }
      }
      throw error; 
    } 
  }
  
  async finalizar(id: number){
    try{
      return await this.prisma.servico.update({
        where: { id: id },
        data: {
          dataExecucao: new Date(), 
          status: 'FINALIZADO',     
        },
        include: {
          tipoServico: true,
          pet: true,
          funcionario: {
            include: {
              pessoa: true,
            },
          },
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Serviço com ID ${id} não encontrado para finalização.`);
        }
      }
      throw error;
    }
  }


  async remove(id: number) {
    try{
      return await this.prisma.servico.delete({
        where: {id: id},
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }
}
