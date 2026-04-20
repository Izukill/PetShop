import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsDecimal } from 'class-validator';

export class CreateProdutoDto {

    @ApiProperty({ description: 'Preço do produto', example: 80.99 })
    @IsNotEmpty({message: 'O preço é obrigatório.'})
    @IsDecimal()  
    preco!: number;

    @ApiProperty({ description: 'Nome do produto', example: 'Ração para cães' })
    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;

    @ApiProperty({ description: 'Quantidade do produto em estoque', example: 50 })
    @IsNotEmpty({message: 'A quantidade é obrigatória.'})
    @IsInt({ message: 'A quantidade deve ser um número inteiro' })
    quantidade!: number;

    @ApiProperty({ description: 'Categoria do produto', example: 'Alimentação' })
    @IsNotEmpty({message: 'A categoria é obrigatória.'})
    @IsString({message: 'A categoria deve ser uma string.'})
    categoria!: string;

    @ApiProperty({ description: 'Indica se o produto está ativo', example: true, required: false })
    @IsOptional()
    @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
    ativo!: boolean;

}
