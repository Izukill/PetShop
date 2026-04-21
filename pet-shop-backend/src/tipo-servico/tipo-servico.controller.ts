import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoServicoService } from './tipo-servico.service';
import { CreateTipoServicoDto } from './dto/create-tipo-servico.dto';
import { UpdateTipoServicoDto } from './dto/update-tipo-servico.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  ApiDocCriarTipoServico, 
  ApiDocListarTiposServico, 
  ApiDocBuscarTipoServicoPorId, 
  ApiDocAtualizarTipoServico, 
  ApiDocRemoverTipoServico 
} from './swagger/tipo-servico.swagger';

@ApiTags('Tipos de Serviço')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tipo-servico')
export class TipoServicoController {
  constructor(private readonly tipoServicoService: TipoServicoService) {}

  @Post()
  @ApiDocCriarTipoServico()
  create(@Body() createTipoServicoDto: CreateTipoServicoDto) {
    return this.tipoServicoService.create(createTipoServicoDto);
  }

  @Get()
  @ApiDocListarTiposServico()
  findAll() {
    return this.tipoServicoService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarTipoServicoPorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.tipoServicoService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarTipoServico()
  update(@Param('lookupId') lookupId: string, @Body() updateTipoServicoDto: UpdateTipoServicoDto) {
    return this.tipoServicoService.update(lookupId, updateTipoServicoDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverTipoServico()
  remove(@Param('lookupId') lookupId: string) {
    return this.tipoServicoService.remove(lookupId);
  }
}
