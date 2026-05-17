import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateFuncionarioDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'Jaqueline ferreira',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome!: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'jaqueline@gmail.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Mátricula de telefone do funcionário',
    example: '83987654321',
  })
  @IsNotEmpty({ message: 'A matrícula é obrigatória.' })
  matricula!: number;

  @ApiProperty({
    description: 'Indica se o funcionário está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
  ativo!: boolean;

  @ApiProperty({ description: 'Cargo do funcionário', example: 'Atendente' })
  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  @IsString({ message: 'O cargo deve ser uma string.' })
  cargo!: string;

  @ApiProperty({
    description: 'Especialização do funcionário',
    example: 'Atendimento ao cliente',
  })
  @IsNotEmpty({ message: 'A especialização é obrigatória.' })
  @IsString({ message: 'A especialização deve ser uma string.' })
  especializacao!: string;

  @ApiProperty({ description: 'Senha do funcionário', example: 'senha123' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  senha!: string;
}
