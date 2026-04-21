import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarTipoServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cadastra um novo tipo de serviço', 
      description: 'Cria uma nova categoria de serviço que o PetShop oferece (ex: Banho e Tosa, Corte de Unhas) definindo nome e preço padrão.' 
    }),
    ApiResponse({ status: 201, description: 'Tipo de serviço cadastrado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados de entrada inválidos (ex: preço negativo ou nome vazio).' })
  );
}

export function ApiDocListarTiposServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Lista o catálogo de serviços', 
      description: 'Retorna todos os tipos de serviços ativos disponíveis para serem vendidos no balcão.' 
    }),
    ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso.' })
  );
}

export function ApiDocBuscarTipoServicoPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca os detalhes de um serviço específico' }),
    ApiParam({ name: 'lookupId', description: 'lookupId numérico do tipo de serviço', example: '345fgdQ@#$df' }),
    ApiResponse({ status: 200, description: 'Serviço encontrado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Serviço não encontrado no banco de dados.' })
  );
}

export function ApiDocAtualizarTipoServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Atualiza os dados de um serviço',
      description: 'Permite alterar informações de um serviço existente, como reajustar o preço ou mudar a descrição.'
    }),
    ApiParam({ name: 'lookupId', description: 'lookupId numérico do tipo de serviço a ser atualizado', example: '345fgdQ@#$df' }),
    ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Serviço não encontrado para atualização.' })
  );
}

export function ApiDocRemoverTipoServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Remove um tipo de serviço do catálogo',
      description: 'Exclui ou desativa um serviço para que ele não apareça mais nas novas vendas.'
    }),
    ApiParam({ name: 'lookupId', description: 'lookupId numérico do tipo de serviço a ser removido', example: '345fgdQ@#$df' }),
    ApiResponse({ status: 200, description: 'Serviço removido com sucesso.' }),
    ApiResponse({ status: 404, description: 'Serviço não encontrado para exclusão.' })
  );
}