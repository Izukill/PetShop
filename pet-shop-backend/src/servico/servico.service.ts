import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ServicoStatus } from '@prisma/client';
import { connect } from 'node:http2';

@Injectable()
export class ServicoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServicoDto: CreateServicoDto) {
    try {
      const novoServico = await this.prisma.servico.create({
        data: {
          status: createServicoDto.status,
          observacao: createServicoDto.observacao,
          precoUnitario: createServicoDto.precoUnitario,
          tipoServico: {
            connect: { lookupId: createServicoDto.tipoServicolookupId },
          },
          funcionario: {
            connect: { lookupId: createServicoDto.funcionariolookupId },
          },
          pet: {
            connect: { lookupId: createServicoDto.petlookupId },
          },
          dataAgendamento: createServicoDto.dataAgendamento,
        },
      });

      return novoServico;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Não é possível cadastrar serviço. Tipo de serviço, funcionário ou pet não encontrado.`,
          );
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

  async findOne(lookupId: string) {
    const servico = await this.prisma.servico.findUnique({
      where: { lookupId: lookupId },
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

    if (!servico) {
      throw new NotFoundException(
        `Serviço com lookupId ${lookupId} não encontrado.`,
      );
    }

    return servico;
  }

  async update(lookupId: string, updateServicoDto: UpdateServicoDto) {
    try {
      return await this.prisma.servico.update({
        where: { lookupId: lookupId },
        data: {
          status: updateServicoDto.status,
          observacao: updateServicoDto.observacao,
          precoUnitario: updateServicoDto.precoUnitario,
          tipoServico: {
            connect: { lookupId: updateServicoDto.tipoServicolookupId },
          },
          funcionario: {
            connect: { lookupId: updateServicoDto.funcionariolookupId },
          },
          pet: {
            connect: { lookupId: updateServicoDto.petlookupId },
          },
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
          throw new NotFoundException(
            `Serviço com lookupId ${lookupId} não encontrado para atualização.`,
          );
        } else if (error.code === 'P2003') {
          throw new NotFoundException(
            `Não é possível atualizar serviço. Tipo de serviço, funcionário ou pet não encontrado.`,
          );
        }
      }
      throw error;
    }
  }

  async finalizar(lookupId: string) {
    try {
      return await this.prisma.servico.update({
        where: { lookupId: lookupId },
        data: {
          dataExecucao: new Date(),
          status: ServicoStatus.CONCLUIDO,
        },
        include: {
          tipoServico: true,
          pet: true,
          funcionario: {
            include: {
              pessoa: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Serviço com lookupId ${lookupId} não encontrado para finalização.`,
          );
        }
      }
      throw error;
    }
  }

  async remove(lookupId: string) {
    try {
      return await this.prisma.servico.delete({
        where: { lookupId: lookupId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Serviço com lookupId ${lookupId} não encontrado.`,
          );
        }
      }
      throw error;
    }
  }
}
