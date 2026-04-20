import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Por favor, informe um formato de e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha!: string;
}