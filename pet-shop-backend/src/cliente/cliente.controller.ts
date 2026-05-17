import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiDocCriarCliente,
  ApiDocListarClientes,
  ApiDocBuscarClientePorId,
  ApiDocAtualizarCliente,
  ApiDocRemoverCliente,
} from './swagger/cliente.swagger';

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiDocCriarCliente()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiDocListarClientes()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarClientePorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.clienteService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarCliente()
  update(
    @Param('lookupId') lookupId: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clienteService.update(lookupId, updateClienteDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverCliente()
  remove(@Param('lookupId') lookupId: string) {
    return this.clienteService.remove(lookupId);
  }
}
