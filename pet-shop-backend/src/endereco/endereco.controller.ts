import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { 
  ApiDocCriarEndereco, 
  ApiDocListarEnderecos, 
  ApiDocBuscarEnderecoPorId, 
  ApiDocAtualizarEndereco, 
  ApiDocRemoverEndereco 
} from './swagger/endereco.swagger';

@ApiTags('Endereços')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  @ApiDocCriarEndereco()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  @ApiDocListarEnderecos()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  @ApiDocBuscarEnderecoPorId()
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(+id);
  }

  @Patch(':id')
  @ApiDocAtualizarEndereco()
  update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecoService.update(+id, updateEnderecoDto);
  }

  @Delete(':id')
  @ApiDocRemoverEndereco()
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(+id);
  }
}
