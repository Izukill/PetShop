import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function ApiDocCriarFuncionario() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastra um novo Funcionário',
      description:
        'Cria um novo colaborador no sistema. **Regra Crítica:** É obrigatório enviar uma `senha` neste endpoint. O sistema irá criptografar a senha automaticamente antes de salvar no banco, permitindo que este funcionário faça Login na API.',
    }),
    ApiResponse({
      status: 201,
      description:
        'Funcionário cadastrado e credenciais de acesso geradas com sucesso.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Dados de entrada inválidos (ex: e-mail já existe no sistema ou senha não informada).',
    }),
  );
}

export function ApiDocListarFuncionarios() {
  return applyDecorators(
    ApiOperation({
      summary: 'Lista a equipe do PetShop',
      description:
        'Retorna todos os funcionários cadastrados, seus cargos e dados de contato. Útil para o painel administrativo da loja.',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de funcionários retornada com sucesso.',
    }),
  );
}

export function ApiDocBuscarFuncionarioPorId() {
  return applyDecorators(
    ApiOperation({ summary: 'Busca a ficha de um funcionário específico' }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do funcionário',
      example: 3,
    }),
    ApiResponse({
      status: 200,
      description: 'Ficha do funcionário encontrada com sucesso.',
    }),
    ApiResponse({
      status: 404,
      description: 'Funcionário não encontrado no banco de dados.',
    }),
  );
}

export function ApiDocAtualizarFuncionario() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza os dados de um funcionário',
      description:
        'Permite alterar o cargo, salário, ou dados pessoais do colaborador. **Nota:** Se a senha for enviada na atualização, ela também será re-criptografada.',
    }),
    ApiParam({
      name: 'lookupId',
      description: 'Código identificador (lookupId) do funcionário',
      example: 3,
    }),
    ApiResponse({
      status: 200,
      description: 'Dados do funcionário atualizados com sucesso.',
    }),
    ApiResponse({ status: 404, description: 'Funcionário não encontrado.' }),
  );
}

export function ApiDocRemoverFuncionario() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove o acesso de um funcionário',
      description:
        'Exclui ou desativa o colaborador. Ao fazer isso, o token JWT dele perderá a validade e ele não poderá mais logar no sistema.',
    }),
    ApiParam({
      name: 'lookupId',
      description:
        'Código identificador (lookupId) do funcionário a ser desligado',
      example: 3,
    }),
    ApiResponse({
      status: 200,
      description: 'Funcionário removido e acesso revogado com sucesso.',
    }),
    ApiResponse({ status: 404, description: 'Funcionário não encontrado.' }),
  );
}
