import {IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateEnderecoDto {

    @IsNotEmpty({message: 'A rua é obrigatória.'})
    @IsString({message: 'A rua deve ser uma string.'})
    rua!: string;

    @IsNotEmpty({message: 'O número é obrigatório.'})
    @IsString({message: 'O número deve ser uma string.'})
    numero!: string;

    @IsString({message: 'O complemento deve ser uma string.'})
    complemento?: string;

    @IsNotEmpty({message: 'O cep é obrigatório.'})
    @IsString({message: 'O cep deve ser uma string.'})
    cep!: string;

    @IsNotEmpty({message: 'O cliente é obrigatório.'})
    @IsInt({ message: 'O ID do cliente deve ser um número inteiro' })
    clienteId!: number;

}
