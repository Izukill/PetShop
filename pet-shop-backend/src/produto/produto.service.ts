import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutoService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {

    const novoProduto = await this.prisma.produto.create({
      data: {
        nome: createProdutoDto.nome,
        categoria: createProdutoDto.categoria,
        preco: createProdutoDto.preco,
        quantidade: createProdutoDto.quantidade,
      },
    });

    return novoProduto;

  }

  async findAll() {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    try{
      return await this.prisma.produto.findUnique({
        where: {id: id},
      });
    } catch (error){
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
      }
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    try{
      return await this.prisma.produto.update({
        where: {id: id},
        data: {
          nome: updateProdutoDto.nome,
          categoria: updateProdutoDto.categoria,
          preco: updateProdutoDto.preco,
          quantidade: updateProdutoDto.quantidade,
        },
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
      }
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.produto.update({
        where: {id: id},
        data: {
          ativo: false,
        }
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
      }
    }
  }
}
