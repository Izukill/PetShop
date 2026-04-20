import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsOptional, IsBoolean, IsDecimal } from 'class-validator';

export class CreateTipoServicoDto {

    @ApiProperty({ description: 'Nome do tipo de serviço', example: 'Banho e Tosa' })
    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string; 

    @ApiProperty({ description: 'Descrição do tipo de serviço', example: 'Serviço completo de banho e tosa para cães de pequeno porte' })
    @IsNotEmpty({message: 'A descrição é obrigatória.'})
    @IsString({message: 'A descrição deve ser uma string.'})
    descricao!: string;

    @ApiProperty({ description: 'Preço do tipo de serviço', example: 150.00 })
    @IsNotEmpty({message: 'O preço é obrigatório.'})
    @IsDecimal()
    preco!: number;

    @ApiProperty({ description: 'Indica se o tipo de serviço está ativo', example: true, required: false })
    @IsOptional()
    @IsBoolean({ message: 'O campo "ativo" deve ser um booleano' })
    ativo!: boolean;

}
