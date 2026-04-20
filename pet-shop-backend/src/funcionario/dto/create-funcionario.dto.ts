import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateFuncionarioDto {

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;
    
    @IsNotEmpty({message: 'O email é obrigatório.'})
    @IsEmail()
    email!: string;

    @IsNotEmpty({message: 'A matrícula é obrigatória.'})
    matricula!: number;

    @IsOptional()
    @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
    ativo!: boolean;

    @IsNotEmpty({message: 'O cargo é obrigatório.'})
    @IsString({message: 'O cargo deve ser uma string.'})
    cargo!: string;

    @IsNotEmpty({message: 'A especialização é obrigatória.'})
    @IsString({message: 'A especialização deve ser uma string.'})
    especializacao!: string;

    @IsNotEmpty({message: 'A senha é obrigatória.'})
    @IsString({message: 'A senha deve ser uma string.'})
    senha!: string;

}
