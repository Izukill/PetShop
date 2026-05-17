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
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiDocCriarFuncionario,
  ApiDocListarFuncionarios,
  ApiDocBuscarFuncionarioPorId,
  ApiDocAtualizarFuncionario,
  ApiDocRemoverFuncionario,
} from './swagger/funcionario.swagger';

@ApiTags('Funcionários')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiDocCriarFuncionario()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  @ApiDocListarFuncionarios()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarFuncionarioPorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.funcionarioService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarFuncionario()
  update(
    @Param('lookupId') lookupId: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(lookupId, updateFuncionarioDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverFuncionario()
  remove(@Param('lookupId') lookupId: string) {
    return this.funcionarioService.remove(lookupId);
  }
}
