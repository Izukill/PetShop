import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const pessoa = await this.prisma.pessoa.findUnique({
      where: { email: loginDto.email },
      include: { funcionario: true }
    });

    if (!pessoa || !pessoa.senha) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, pessoa.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const payload = { 
      sub: pessoa.id, 
      email: pessoa.email,
      funcionarioId: pessoa.funcionario?.id
    };

    //se der tudo certo retorna o token e o nome do funcionário para mostrar no app
    return {
      access_token: await this.jwtService.signAsync(payload),
      nome: pessoa.nome,
    };
  }
}