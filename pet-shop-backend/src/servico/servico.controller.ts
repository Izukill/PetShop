import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  ApiDocCriarServico, 
  ApiDocListarServicos, 
  ApiDocBuscarServicoPorId, 
  ApiDocAtualizarServico, 
  ApiDocRemoverServico,
  ApiDocFinalizarServico
} from './swagger/servico.swagger';

@ApiTags('Serviços')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @ApiDocCriarServico()
  create(@Body() createServicoDto: CreateServicoDto) {
    return this.servicoService.create(createServicoDto);
  }

  @Get()
  @ApiDocListarServicos()
  findAll() {
    return this.servicoService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarServicoPorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.servicoService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarServico()
  update(@Param('lookupId') lookupId: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicoService.update(lookupId, updateServicoDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverServico()
  remove(@Param('lookupId') lookupId: string) {
    return this.servicoService.remove(lookupId);
  }

  @Patch(':lookupId/finalizar')
  @ApiDocFinalizarServico()
  finalizar(@Param ('lookupId') lookupId: string) {
    return this.servicoService.finalizar(lookupId);
  }

}
