import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Jaqueline Ferreira',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome!: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'jaqueline@gmail.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Número de telefone do cliente',
    example: '83987654321',
  })
  @MinLength(8, {
    message: 'O número de telefone deve ter no mínimo 8 dígitos',
  })
  @IsString({ message: 'O número de telefone deve ser uma string.' })
  numero!: string;

  @ApiProperty({
    description: 'Indica se o cliente está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
  ativo!: boolean;
}
