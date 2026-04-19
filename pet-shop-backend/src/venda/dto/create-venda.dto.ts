import { IsNotEmpty, IsNumber, IsInt, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { VendaStatus } from '@prisma/client';
import { Type } from 'class-transformer';

class ItemVendaDto {
    @IsInt() produtoId!: number;    
    @IsNumber() precoUnitario!: number;
    @IsInt() quantidade!: number;
  }



export class CreateVendaDto {


    @IsEnum(VendaStatus, { message: 'Status inválido. Use CONCLUIDA, CANCELADA ou AGUARDANDO' })
    @IsNotEmpty({ message: 'O status da venda é obrigatório.' })
    status!: VendaStatus;

    @IsNotEmpty({message: 'O cliente é obrigatório.'})
    @IsInt({ message: 'O clienteId deve ser um número inteiro' })
    clienteId!: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemVendaDto)
    itens!: ItemVendaDto[];

    @IsArray()
    @IsInt({ each: true })
    servicosId!: number[];

}
