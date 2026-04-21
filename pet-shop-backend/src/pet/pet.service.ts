import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from '../prisma/prisma.service';
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
          dono: {
            connect: {lookupId: createPetDto.clientelookupId},
          }
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Não é possível cadastrar pet. Cliente com lookupId ${createPetDto.clientelookupId} não encontrado.`);
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

  async findOne(lookupId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: {lookupId: lookupId},
      include: {
        dono: true,
      },
    });

    if(!pet){
      throw new NotFoundException(`Pet com lookupId ${lookupId} não encontrado.`);
    }

    return pet;
  }

  async update(lookupId: string, updatePetDto: UpdatePetDto) {
    try{
      return await this.prisma.pet.update({
        where: {lookupId: lookupId},
        data: {
          nome: updatePetDto.nome,
          raca: updatePetDto.raca,
          especie: updatePetDto.especie,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Pet com lookupId ${lookupId} não encontrado.`);
        }
      }
      throw error;
    }
  }

  async remove(lookupId: string) {
    try{
      return await this.prisma.pet.delete({
        where: {lookupId: lookupId},
      });
    } catch (error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Pet com lookupId ${lookupId} não encontrado.`);
        }
      }
      throw error;
    }
  }
}
