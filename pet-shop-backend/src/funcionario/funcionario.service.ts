import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService {

  constructor(private readonly prisma: PrismaService) {}
  
  async create(createFuncionarioDto: CreateFuncionarioDto) {

    const senhaCriptografada = await bcrypt.hash(createFuncionarioDto.senha, 10);

    const novoFuncionario = await this.prisma.funcionario.create({

      
      data: {
        
        especializacao: createFuncionarioDto.especializacao,
        matricula: createFuncionarioDto.matricula,
        cargo: createFuncionarioDto.cargo,
        pessoa: {
          create: {
            nome: createFuncionarioDto.nome,
            email: createFuncionarioDto.email,
            dataCadastro: new Date(),
            senha: senhaCriptografada,
          },
        },
      },
      include: {
        pessoa: true,
      },
    });

    return novoFuncionario;
  }

  async findAll() {
    return await this.prisma.funcionario.findMany({
      include: {
        pessoa: true,
      },
    });
  }

  async findOne(id: number) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: {id: id},
      include: {
        pessoa: true,
      },
    });

    if(!funcionario){
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }

    return funcionario;
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    try{
      return await this.prisma.funcionario.update({
        where: {id: id},
        data: {
          especializacao: updateFuncionarioDto.especializacao,
          matricula: updateFuncionarioDto.matricula,
          cargo: updateFuncionarioDto.cargo,
          pessoa: {
            update: {
              nome: updateFuncionarioDto.nome,
              email: updateFuncionarioDto.email,
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
          throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
        }
      }
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.funcionario.update({
        where: {id: id},
        data: {
          pessoa:{
            update: {
              ativo: false,
            }
          }
        }
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
        }
      }
    }
  }
}
