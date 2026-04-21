import {IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsEnum, IsDecimal } from 'class-validator';
import { ServicoStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoDto {

    @ApiProperty({ description: 'Status do serviço', enum: ServicoStatus, example: ServicoStatus.AGENDADO })
    @IsNotEmpty({message: 'O status é obrigatório.'})
    @IsEnum(ServicoStatus, { message: 'Status inválido. Use AGENDADO, ANDAMENTO, CONCLUIDO ou CANCELADO' })
    status!: ServicoStatus;

    @ApiProperty({ description: 'Observação do serviço', example: 'O pet precisa de atenção especial durante o banho.' })
    @IsOptional()
    @IsString({message: 'A observação deve ser uma string.'})
    observacao!: string;

    @ApiProperty({ description: 'Data de agendamento do serviço', example: '2024-07-01T10:00:00Z' })
    @IsOptional()
    @IsDate({ message: 'A data de agendamento deve ser uma data válida' })
    dataAgendamento?: Date;

    @ApiProperty({ description: 'Data de execução do serviço', example: '2024-07-01T12:00:00Z' })
    @IsOptional()
    @IsDate({ message: 'A data de execução deve ser uma data válida' })
    dataExecucao?: Date;

    @ApiProperty({ description: 'Preço unitário do serviço', example: 150.00 })
    @IsNotEmpty({message: 'O preço unitário é obrigatório.'})
    @IsDecimal()
    precoUnitario!: string;

    @ApiProperty({ description: 'lookupId do tipo de serviço associado ao serviço', example: 1 })
    @IsNotEmpty({message: 'O tipo de serviço é obrigatório.'})
    @IsInt({ message: 'O lookupId do tipo de serviço deve ser um número inteiro' })
    tipoServicolookupId!: string;

    @ApiProperty({ description: 'lookupId do pet associado ao serviço', example: 1 })
    @IsNotEmpty({message: 'O pet é obrigatório.'})
    @IsInt({ message: 'O lookupId do pet deve ser um número inteiro' })
    petlookupId!: string;

    @ApiProperty({ description: 'lookupId do funcionário associado ao serviço', example: 1 })
    @IsNotEmpty({message: 'O funcionário é obrigatório.'})
    @IsInt({ message: 'O lookupId do funcionário deve ser um número inteiro' })
    funcionariolookupId!: string;

    @ApiProperty({ description: 'lookupId da venda associada ao serviço', example: 1, required: false })
    @IsOptional()
    @IsString({message: 'O lookupId da venda deve ser uma string.'})
    vendalookupId?: string;

}
