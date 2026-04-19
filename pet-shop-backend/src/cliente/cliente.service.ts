import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    return `This action returns a #${id} cliente`;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
