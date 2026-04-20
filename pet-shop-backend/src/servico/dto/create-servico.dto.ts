import {IsNotEmpty, IsString, IsInt, IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { ServicoStatus } from '@prisma/client';

export class CreateServicoDto {

    @IsNotEmpty({message: 'O status é obrigatório.'})
    @IsEnum(ServicoStatus, { message: 'Status inválido. Use AGENDADO, ANDAMENTO, CONCLUIDO ou CANCELADO' })
    status!: ServicoStatus;

    @IsOptional()
    @IsString({message: 'A observação deve ser uma string.'})
    observacao!: string;

    @IsOptional()
    @IsDate({ message: 'A data de agendamento deve ser uma data válida' })
    dataAgendamento?: Date;

    @IsOptional()
    @IsDate({ message: 'A data de execução deve ser uma data válida' })
    dataExecucao?: Date;

    @IsNotEmpty({message: 'O preço unitário é obrigatório.'})
    @IsNumber({}, { message: 'O preço unitário deve ser um número' })
    precoUnitario!: number;

    @IsNotEmpty({message: 'O tipo de serviço é obrigatório.'})
    @IsInt({ message: 'O ID do tipo de serviço deve ser um número inteiro' })
    tipoServicoId!: number;

    @IsNotEmpty({message: 'O pet é obrigatório.'})
    @IsInt({ message: 'O ID do pet deve ser um número inteiro' })
    petId!: number;

    @IsNotEmpty({message: 'O funcionário é obrigatório.'})
    @IsInt({ message: 'O ID do funcionário deve ser um número inteiro' })
    funcionarioId!: number;

    @IsOptional()
    @IsInt({ message: 'O ID da venda deve ser um número inteiro' })
    vendaId?: number;

}
