import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePetDto {

    @ApiProperty({ description: 'Nome do pet', example: 'Rex' })
    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;
    
    @ApiProperty({ description: 'Espécie do pet', example: "Gato" })
    @IsNotEmpty({message: 'A espécie é obrigatória.'})
    @IsString({message: 'A espécie deve ser uma string.'})
    especie!: string;

    @ApiProperty({ description: 'Raça do pet', example: "Siamês" })
    @IsNotEmpty({message: 'A raça é obrigatória.'})
    @IsString({message: 'A raça deve ser uma string.'})
    raca!: string;

    @ApiProperty({ description: 'lookupId do cliente dono do pet', example: 1 })
    @IsNotEmpty({message: 'O lookupId do cliente é obrigatório'})
    @IsString({message: 'O lookupId do cliente deve ser uma string.'})
    clientelookupId!: string;

}
