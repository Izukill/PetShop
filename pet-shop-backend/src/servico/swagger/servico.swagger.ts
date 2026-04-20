// src/servico/docs/servico.swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Registra a entrada de um pet para um serviço', 
      description: 'Cria uma "Ordem de Serviço" vinculando um Pet, um Cliente e o Tipo de Serviço escolhido (ex: Banho). Geralmente entra com status PENDENTE ou EM ANDAMENTO.' 
    }),
    ApiResponse({ status: 201, description: 'Serviço registrado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados incompletos (ex: faltou o ID do Pet ou do Tipo de Serviço).' }),
    ApiResponse({ status: 404, description: 'Pet, Cliente ou Tipo de Serviço não encontrados.' })
  );
}

export function ApiDocListarServicos() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Lista a agenda/histórico de serviços', 
      description: 'Retorna todos os serviços já agendados ou realizados no PetShop, útil para montar o painel de controle dos tosadores/banhistas.' 
    }),
    ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso.' })
  );
}

export function ApiDocBuscarServicoPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca os detalhes de uma ordem de serviço' }),
    ApiParam({ name: 'id', description: 'ID numérico do serviço (Ordem de Serviço)', example: 42 }),
    ApiResponse({ status: 200, description: 'Detalhes do serviço retornados com sucesso.' }),
    ApiResponse({ status: 404, description: 'Ordem de Serviço não encontrada.' })
  );
}

export function ApiDocAtualizarServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Edita informações de uma ordem de serviço',
      description: 'Permite adicionar observações extras ou corrigir alguma informação antes do serviço ser finalizado.'
    }),
    ApiParam({ name: 'id', description: 'ID numérico do serviço a ser editado', example: 42 }),
    ApiResponse({ status: 200, description: 'Ordem de serviço atualizada com sucesso.' }),
    ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  );
}

export function ApiDocRemoverServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cancela/Exclui uma ordem de serviço',
      description: 'Remove o serviço da fila. Atenção: se o serviço já estiver vinculado a uma Venda Concluída, a exclusão pode ser bloqueada por regra de negócio.'
    }),
    ApiParam({ name: 'id', description: 'ID numérico do serviço a ser removido', example: 42 }),
    ApiResponse({ status: 200, description: 'Ordem de serviço cancelada/removida com sucesso.' }),
    ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  );
}

export function ApiDocFinalizarServico() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Marca o serviço como CONCLUÍDO',
      description: 'Ação rápida para o funcionário apertar um botão e informar que o serviço foi finalizado.'
    }),
    ApiParam({ name: 'id', description: 'ID numérico do serviço recém-terminado', example: 42 }),
    ApiResponse({ status: 200, description: 'Status do serviço alterado para CONCLUÍDO.' }),
    ApiResponse({ status: 400, description: 'O serviço já estava finalizado ou cancelado.' }),
    ApiResponse({ status: 404, description: 'Ordem de serviço não encontrada.' })
  );
}