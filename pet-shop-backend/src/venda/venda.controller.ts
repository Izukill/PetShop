import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  ApiDocCriarVenda, 
  ApiDocListarVendas, 
  ApiDocBuscarVendaPorId, 
  ApiDocAtualizarVenda, 
  ApiDocRemoverVenda 
} from './swagger/venda.swagger';

@ApiTags('Vendas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  @ApiDocCriarVenda()
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.create(createVendaDto);
  }

  @Get()
  @ApiDocListarVendas()
  findAll() {
    return this.vendaService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarVendaPorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.vendaService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarVenda()
  update(@Param('lookupId') lookupId: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendaService.update(lookupId, updateVendaDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverVenda()
  remove(@Param('lookupId') lookupId: string) {
    return this.vendaService.remove(lookupId);
  }
}
