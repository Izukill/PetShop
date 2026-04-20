import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarVenda() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Registra uma nova venda', 
      description: 'Calcula o valor final somando produtos e serviços, cria o registro da venda e **desconta a quantidade dos produtos no estoque** automaticamente.' 
    }),
    ApiResponse({ status: 201, description: 'Venda registrada e estoque atualizado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados de entrada inválidos (ex: falta do ID do cliente).' }),
    ApiResponse({ status: 404, description: 'Um ou mais produtos/serviços não foram encontrados.' })
  );
}

export function ApiDocListarVendas() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Lista todas as vendas', 
      description: 'Retorna o histórico completo de vendas, incluindo os dados do cliente, produtos comprados e serviços realizados.' 
    }),
    ApiResponse({ status: 200, description: 'Lista de vendas retornada com sucesso.' })
  );
}

export function ApiDocBuscarVendaPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca os detalhes de uma venda específica' }),
    ApiParam({ name: 'id', description: 'ID numérico da venda', example: 15 }),
    ApiResponse({ status: 200, description: 'Venda encontrada e retornada com sucesso.' }),
    ApiResponse({ status: 404, description: 'Nenhuma venda encontrada com o ID informado.' })
  );
}

export function ApiDocAtualizarVenda() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Atualiza o status de uma venda',
      description: 'Permite mudar o status da venda (ex: de CONCLUIDA para CANCELADA). **Se cancelada, os produtos retornam ao estoque e os serviços são desvinculados.**'
    }),
    ApiParam({ name: 'id', description: 'ID numérico da venda a ser atualizada', example: 15 }),
    ApiResponse({ status: 200, description: 'Status da venda atualizado e estoque corrigido.' }),
    ApiResponse({ status: 404, description: 'Venda não encontrada para atualização.' })
  );
}

export function ApiDocRemoverVenda() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cancela uma venda (Soft Delete)',
      description: 'Este endpoint é um atalho que muda o status da venda para CANCELADA, acionando a mesma lógica de devolução de estoque do endpoint de atualização.'
    }),
    ApiParam({ name: 'id', description: 'ID numérico da venda a ser cancelada', example: 15 }),
    ApiResponse({ status: 200, description: 'Venda cancelada com sucesso.' }),
    ApiResponse({ status: 404, description: 'Venda não encontrada para cancelamento.' })
  );
}