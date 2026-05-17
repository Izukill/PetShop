// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o plantio de dados');

  const senhaPlana = 'batata';

  const salt = await bcrypt.genSalt();
  const senhaCriptografada = await bcrypt.hash(senhaPlana, salt);

  //função upsert do prisma (se n exisitr ele cria e já tiver no banco só ignora perfeito para mockar os dados)
  const admin = await prisma.pessoa.upsert({
    where: { email: 'jaqueline@gmail.com' },
    update: {},
    create: {
      nome: 'Jaqueline Ferreira',
      email: 'jaqueline@gmail.com',
      senha: senhaCriptografada,
      dataCadastro: new Date(),
      ativo: true,
      funcionario: {
        create: {
          cargo: 'Gerente Geral',
          matricula: 123456,
          especializacao: 'Administração de Empresas',
        },
      },
    },
  });

  console.log('Usuário Admin criado com sucesso!');
  console.log('E-mail:', admin.email);
  console.log('Senha: ', senhaPlana);
}

//o Prisma exige esse bloco de tratamento de erros no final
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
