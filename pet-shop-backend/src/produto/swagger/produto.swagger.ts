import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarProduto() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cadastra um novo produto no estoque', 
      description: 'Adiciona um item físico ao catálogo da loja (ex: Saco de Ração, Brinquedo, Remédio), definindo o preço de venda e a quantidade inicial em estoque.' 
    }),
    ApiResponse({ status: 201, description: 'Produto cadastrado e disponível para venda.' }),
    ApiResponse({ status: 400, description: 'Dados de entrada inválidos (ex: preço negativo, nome não informado).' })
  );
}

export function ApiDocListarProdutos() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Lista o catálogo de produtos e estoque', 
      description: 'Retorna todos os produtos cadastrados. Útil para montar a vitrine do PDV (Frente de Caixa) ou para fazer balanço de estoque.' 
    }),
    ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.' })
  );
}

export function ApiDocBuscarProdutoPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca os detalhes de um produto específico' }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do produto', example: 101 }),
    ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado no banco de dados.' })
  );
}

export function ApiDocAtualizarProduto() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Atualiza dados ou estoque de um produto',
      description: 'Permite alterar informações do produto, como reajustar o preço de venda, corrigir o nome ou fazer um **ajuste manual de estoque** (entrada de mercadoria).'
    }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do produto a ser editado', example: 101 }),
    ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado para atualização.' })
  );
}

export function ApiDocRemoverProduto() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Remove um produto do catálogo',
      description: 'Exclui um produto do sistema. Atenção: se o produto já estiver vinculado a uma Venda no histórico, o produto será desativo para manter a integridade fiscal.'
    }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do produto a ser removido', example: 101 }),
    ApiResponse({ status: 200, description: 'Produto removido com sucesso.' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado para exclusão.' })
  );
}