import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDocLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Realiza o login no sistema (Gera o Token JWT)',
      description:
        'Endpoint público para autenticação de funcionários. Recebe o e-mail e a senha, valida a criptografia no banco de dados e devolve o "Crachá Virtual" (access_token) que deve ser usado no cabeçalho das próximas requisições.',
    }),
    ApiResponse({
      status: 200,
      description:
        'Login bem-sucedido. Retorna o Token JWT e o nome do funcionário para exibição no Front-end.',
    }),
    ApiResponse({
      status: 401,
      description: 'Acesso negado. E-mail não encontrado ou senha incorreta.',
    }),
    ApiResponse({
      status: 400,
      description:
        'Erro de validação (ex: e-mail em formato inválido ou campos vazios).',
    }),
  );
}
