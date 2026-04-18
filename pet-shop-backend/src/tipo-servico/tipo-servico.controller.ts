import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoServicoService } from './tipo-servico.service';
import { CreateTipoServicoDto } from './dto/create-tipo-servico.dto';
import { UpdateTipoServicoDto } from './dto/update-tipo-servico.dto';

@Controller('tipo-servico')
export class TipoServicoController {
  constructor(private readonly tipoServicoService: TipoServicoService) {}

  @Post()
  create(@Body() createTipoServicoDto: CreateTipoServicoDto) {
    return this.tipoServicoService.create(createTipoServicoDto);
  }

  @Get()
  findAll() {
    return this.tipoServicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoServicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoServicoDto: UpdateTipoServicoDto) {
    return this.tipoServicoService.update(+id, updateTipoServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoServicoService.remove(+id);
  }
}
