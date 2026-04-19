import {IsNotEmpty, IsString, IsInt, IsDate } from 'class-validator';

export class CreateServicoDto {

    @IsNotEmpty({message: 'O status é obrigatório.'})
    @IsString({message: 'O status deve ser uma string.'})    
    status!: string;

    @IsString({message: 'A observação deve ser uma string.'})
    observacao!: string;

    @IsDate({ message: 'A data de agendamento deve ser uma data válida' })
    dataAgendamento?: Date;

    @IsDate({ message: 'A data de execução deve ser uma data válida' })
    dataExecucao?: Date;

    @IsNotEmpty({message: 'O tipo de serviço é obrigatório.'})
    @IsInt({ message: 'O ID do tipo de serviço deve ser um número inteiro' })
    tipoServicoId!: number;

    @IsNotEmpty({message: 'O pet é obrigatório.'})
    @IsInt({ message: 'O ID do pet deve ser um número inteiro' })
    petId!: number;

    @IsNotEmpty({message: 'O funcionário é obrigatório.'})
    @IsInt({ message: 'O ID do funcionário deve ser um número inteiro' })
    funcionarioId!: number;

    @IsInt({ message: 'O ID da venda deve ser um número inteiro' })
    vendaId?: number;

}
