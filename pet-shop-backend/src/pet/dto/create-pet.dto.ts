import {IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePetDto {

    @IsNotEmpty({message: 'O nome é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    nome!: string;
    
    @IsNotEmpty({message: 'A espécie é obrigatória.'})
    @IsString({message: 'A espécie deve ser uma string.'})
    especie!: string;

    @IsNotEmpty({message: 'A raça é obrigatória.'})
    @IsString({message: 'A raça deve ser uma string.'})
    raca!: string;

    @IsNotEmpty({message: 'O id do cliente é obrigatório'})
    @IsInt({ message: 'O ID do cliente deve ser um número inteiro' })
    clienteId!: number;

}
