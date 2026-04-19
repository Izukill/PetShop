import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoServicoDto } from './dto/create-tipo-servico.dto';
import { UpdateTipoServicoDto } from './dto/update-tipo-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';	
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

  async findOne(id: number) {
    try{
      return await this.prisma.tipoServico.findUnique({
        where: {id: id},
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Tipo de serviço com ID ${id} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async update(id: number, updateTipoServicoDto: UpdateTipoServicoDto) {
    try{
      return await this.prisma.tipoServico.update({
        where: {id: id},
        data: {
          nome: updateTipoServicoDto.nome,
          descricao: updateTipoServicoDto.descricao,
          preco: updateTipoServicoDto.preco,
        },
      });
    } catch (error){
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2025') {
          throw new NotFoundException(`Tipo de serviço com ID ${id} não encontrado.`);
        }
      }
    }
  }

  async remove(id: number) {
    try{
      await this.prisma.tipoServico.update({
        where: {id: id},
        data: {
          ativo: false,
        }
      });
    }catch (error){
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code === 'P2025') {
          throw new NotFoundException(`Tipo de serviço com ID ${id} não encontrado.`);
        }
      }
    }
  }
}
