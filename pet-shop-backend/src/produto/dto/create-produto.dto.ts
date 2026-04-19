import {IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateProdutoDto {

    @IsNotEmpty({message: 'O preço é obrigatório.'})
    @IsInt({ message: 'O preço deve ser um número inteiro' })    
    preco!: number;

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;

    @IsNotEmpty({message: 'A quantidade é obrigatória.'})
    @IsInt({ message: 'A quantidade deve ser um número inteiro' })
    quantidade!: number;

    @IsNotEmpty({message: 'A categoria é obrigatória.'})
    @IsString({message: 'A categoria deve ser uma string.'})
    categoria!: string;

    @IsOptional()
    @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
    ativo!: boolean;

}
