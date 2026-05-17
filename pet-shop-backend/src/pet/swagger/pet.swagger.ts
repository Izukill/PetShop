import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarPet() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastra um novo Pet',
      description:
        'Adiciona um novo animalzinho ao sistema. **Regra importante:** Todo Pet deve estar obrigatoriamente vinculado ao ID de um Cliente (Tutor) existente.',
    }),
    ApiResponse({
      status: 201,
      description: 'Pet cadastrado com sucesso e vinculado ao tutor.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Dados incompletos (ex: faltou o nome da espécie ou o ID do tutor).',
    }),
    ApiResponse({
      status: 404,
      description: 'Cliente (Tutor) informado não foi encontrado.',
    }),
  );
}

export function ApiDocListarPets() {
  return applyDecorators(
    ApiOperation({
      summary: 'Lista todos os Pets cadastrados',
      description:
        'Retorna a lista de todos os animais da clínica/petshop, incluindo as informações básicas do seu respectivo tutor.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de pets retornada com sucesso.',
    }),
  );
}

export function ApiDocBuscarPetPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca o prontuário de um Pet específico' }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do Pet',
      example: 7,
    }),
    ApiResponse({
      status: 200,
      description: 'Dados do Pet retornados com sucesso.',
    }),
    ApiResponse({ status: 404, description: 'Pet não encontrado no sistema.' }),
  );
}

export function ApiDocAtualizarPet() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os dados de um Pet',
      description:
        'Permite corrigir informações do animal, como atualizar o peso, alterar a idade ou adicionar alguma observação médica (alergias, etc).',
    }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do Pet a ser atualizado',
      example: 7,
    }),
    ApiResponse({
      status: 200,
      description: 'Dados do Pet atualizados com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Pet não encontrado para atualização.',
    }),
  );
}

export function ApiDocRemoverPet() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove o cadastro de um Pet',
      description:
        'Exclui o animal do sistema. Se o Pet já tiver histórico de serviços (banhos/tosas), a exclusão pode ser impedida para preservar o histórico da loja.',
    }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do Pet a ser removido',
      example: 7,
    }),
    ApiResponse({
      status: 200,
      description: 'Cadastro do Pet removido com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Pet não encontrado para exclusão.',
    }),
  );
}
