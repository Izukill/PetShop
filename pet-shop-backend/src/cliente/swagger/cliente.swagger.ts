import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarCliente() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastra um novo Cliente (Tutor)',
      description:
        'Registra um novo cliente no sistema. **Lembrete de Arquitetura:** Diferente dos funcionários, os clientes são salvos na tabela Pessoa sem a exigência de uma senha de acesso.',
    }),
    ApiResponse({
      status: 201,
      description: 'Cliente cadastrado com sucesso.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Dados de entrada inválidos (ex: e-mail já cadastrado, formato de CPF incorreto).',
    }),
  );
}

export function ApiDocListarClientes() {
  return applyDecorators(
    ApiOperation({
      summary: 'Lista a base de clientes',
      description:
        'Retorna todos os clientes cadastrados. Útil para montar listas de transmissão de marketing ou consultar históricos no balcão.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de clientes retornada com sucesso.',
    }),
  );
}

export function ApiDocBuscarClientePorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca a ficha completa de um cliente' }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do cliente',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'Ficha do cliente encontrada com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Cliente não encontrado no banco de dados.',
    }),
  );
}

export function ApiDocAtualizarCliente() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os dados de contato do cliente',
      description:
        'Permite corrigir informações pessoais como telefone, e-mail ou nome.',
    }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do cliente',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'Dados do cliente atualizados com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Cliente não encontrado para atualização.',
    }),
  );
}

export function ApiDocRemoverCliente() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove o cadastro de um cliente',
      description:
        'Exclui o cliente do sistema. **Atenção:** A exclusão pode falhar (Erro 409 ou 500) caso o cliente já possua Pets ou Vendas atreladas a ele, garantindo a integridade do banco de dados.',
    }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do cliente a ser removido',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'Cadastro do cliente removido com sucesso.',
    }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado.' }),
  );
}
