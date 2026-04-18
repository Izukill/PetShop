import { Injectable } from '@nestjs/common';
import { CreateTipoServicoDto } from './dto/create-tipo-servico.dto';
import { UpdateTipoServicoDto } from './dto/update-tipo-servico.dto';

@Injectable()
export class TipoServicoService {
  create(createTipoServicoDto: CreateTipoServicoDto) {
    return 'This action adds a new tipoServico';
  }

  findAll() {
    return `This action returns all tipoServico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoServico`;
  }

  update(id: number, updateTipoServicoDto: UpdateTipoServicoDto) {
    return `This action updates a #${id} tipoServico`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoServico`;
  }
}
