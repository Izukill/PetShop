import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFuncionarioDto {

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;
    
    @IsNotEmpty({message: 'O email é obrigatório.'})
    @IsEmail()
    email!: string;

    @IsNotEmpty({message: 'A matrícula é obrigatória.'})
    matricula!: number;

    ativo!: boolean;

    @IsNotEmpty({message: 'O cargo é obrigatório.'})
    @IsString({message: 'O cargo deve ser uma string.'})
    cargo!: string;

    @IsNotEmpty({message: 'A especialização é obrigatória.'})
    @IsString({message: 'A especialização deve ser uma string.'})
    especializacao!: string;

}
