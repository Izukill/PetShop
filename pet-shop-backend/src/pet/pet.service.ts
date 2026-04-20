import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    try{
      return await this.prisma.pet.create({
        data: {
          nome: createPetDto.nome,
          raca: createPetDto.raca,
          especie: createPetDto.especie,
          clienteId: createPetDto.clienteId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(`Não é possível cadastrar endereço. Cliente com ID ${createPetDto.clienteId} não encontrado.`);
        }
      }
      throw error; 
    }
  }

  async findAll() {
    return await this.prisma.pet.findMany({
      include: {
        dono: true,
      },
    });
  }

  async findOne(id: number) {
    const pet = await this.prisma.pet.findUnique({
      where: {id: id},
      include: {
        dono: true,
      },
    });

    if(!pet){
      throw new NotFoundException(`Pet com ID ${id} não encontrado.`);
    }

    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    try{
      return await this.prisma.pet.update({
        where: {id: id},
        data: {
          nome: updatePetDto.nome,
          raca: updatePetDto.raca,
          especie: updatePetDto.especie,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Pet com ID ${id} não encontrado.`);
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.pet.delete({
        where: {id: id},
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Pet com ID ${id} não encontrado.`);
        }
      }
      throw error;
    }
  }
}
