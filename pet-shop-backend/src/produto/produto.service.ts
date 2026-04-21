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

  async findOne(lookupId: string) {
    const produto = await this.prisma.produto.findUnique({
      where: {lookupId: lookupId},
    });

    if(!produto){
      throw new NotFoundException(`Produto com lookupId ${lookupId} não encontrado.`);
    }

    return produto;
  }

  async update(lookupId: string, updateProdutoDto: UpdateProdutoDto) {
    try{
      return await this.prisma.produto.update({
        where: {lookupId: lookupId},
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
          throw new NotFoundException(`Produto com lookupId ${lookupId} não encontrado.`);
        }
      }
    }
  }

  async remove(lookupId: string) {
    try{
      return await this.prisma.produto.update({
        where: {lookupId: lookupId},
        data: {
          ativo: false,
        }
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com lookupId ${lookupId} não encontrado.`);
        }
      }
    }
  }
}
