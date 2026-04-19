import {IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateTipoServicoDto {

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string; 

    @IsNotEmpty({message: 'A descrição é obrigatória.'})
    @IsString({message: 'A descrição deve ser uma string.'})
    descricao!: string;

    @IsNotEmpty({message: 'O preço é obrigatório.'})
    @IsInt({ message: 'O preço deve ser um número' })
    preco!: number;

    @IsOptional()
    @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
    ativo!: boolean;

}
