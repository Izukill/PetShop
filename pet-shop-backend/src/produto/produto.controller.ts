import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  ApiDocRemoverProduto 
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

  @Get(':id')
  @ApiDocBuscarProdutoPorId()
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  @ApiDocAtualizarProduto()
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiDocRemoverProduto()
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
