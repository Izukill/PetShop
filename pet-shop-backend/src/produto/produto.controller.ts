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
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiDocCriarProduto,
  ApiDocListarProdutos,
  ApiDocBuscarProdutoPorId,
  ApiDocAtualizarProduto,
  ApiDocRemoverProduto,
} from './swagger/produto.swagger';

@ApiTags('Produtos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiDocCriarProduto()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiDocListarProdutos()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':lookupId')
  @ApiDocBuscarProdutoPorId()
  findOne(@Param('lookupId') lookupId: string) {
    return this.produtoService.findOne(lookupId);
  }

  @Patch(':lookupId')
  @ApiDocAtualizarProduto()
  update(
    @Param('lookupId') lookupId: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtoService.update(lookupId, updateProdutoDto);
  }

  @Delete(':lookupId')
  @ApiDocRemoverProduto()
  remove(@Param('lookupId') lookupId: string) {
    return this.produtoService.remove(lookupId);
  }
}
