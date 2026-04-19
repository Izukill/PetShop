import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;
    
    @IsNotEmpty({message: 'O email é obrigatório.'})
    @IsEmail()
    email!: string;
    
    @MinLength(8, { message: 'O número de telefone deve ter no mínimo 8 dígitos' })
    @IsString({message: 'O número de telefone deve ser uma string.'})
    numero!: string;

    ativo!: boolean;




}
