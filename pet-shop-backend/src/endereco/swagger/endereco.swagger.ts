import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarEndereco() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Cadastra um novo endereço', 
      description: 'Salva os dados de localização (Rua, Número, CEP, Bairro) e os vincula obrigatoriamente a uma Pessoa (Cliente ou Funcionário).' 
    }),
    ApiResponse({ status: 201, description: 'Endereço cadastrado e vinculado com sucesso.' }),
    ApiResponse({ status: 400, description: 'Dados de entrada inválidos (ex: CEP mal formatado ou falta de ID da pessoa).' }),
    ApiResponse({ status: 404, description: 'Pessoa informada não foi encontrada.' })
  );
}

export function ApiDocListarEnderecos() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Lista todos os endereços', 
      description: 'Retorna a base completa de endereços cadastrados no sistema. Pode ser útil para logística de entregas (Táxi Dog) ou auditoria.' 
    }),
    ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso.' })
  );
}

export function ApiDocBuscarEnderecoPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca os detalhes de um endereço específico' }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do endereço', example: 12 }),
    ApiResponse({ status: 200, description: 'Dados do endereço encontrados com sucesso.' }),
    ApiResponse({ status: 404, description: 'Endereço não encontrado no sistema.' })
  );
}

export function ApiDocAtualizarEndereco() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Atualiza um endereço existente',
      description: 'Permite corrigir informações de localização, como atualizar o número da casa, trocar o complemento ou corrigir o CEP.'
    }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do endereço a ser atualizado', example: 12 }),
    ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.' }),
    ApiResponse({ status: 404, description: 'Endereço não encontrado para atualização.' })
  );
}

export function ApiDocRemoverEndereco() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Remove um endereço',
      description: 'Exclui o registro de endereço do banco de dados.'
    }),
    ApiParam({ name: 'id', description: 'Código identificador (ID) do endereço a ser removido', example: 12 }),
    ApiResponse({ status: 200, description: 'Endereço removido com sucesso.' }),
    ApiResponse({ status: 404, description: 'Endereço não encontrado para exclusão.' })
  );
}