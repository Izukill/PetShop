import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ClienteModule } from './cliente/cliente.module';
import { PetModule } from './pet/pet.module';
import { VendaModule } from './venda/venda.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ProdutoModule } from './produto/produto.module';
import { TipoServicoModule } from './tipo-servico/tipo-servico.module';
import { ServicoModule } from './servico/servico.module';
import { EnderecoModule } from './endereco/endereco.module';

@Global()
@Module({
  imports: [PrismaModule, ClienteModule, PetModule, VendaModule, FuncionarioModule, ProdutoModule, TipoServicoModule, ServicoModule, EnderecoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
