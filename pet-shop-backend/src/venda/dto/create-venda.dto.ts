import { IsNotEmpty, IsNumber, IsInt, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { VendaStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ItemVendaDto {
  @ApiProperty({ description: 'ID do produto', example: 10 })
  @IsInt() 
  produtoId!: number;    
  
  @ApiProperty({ description: 'Preço cobrado por unidade', example: 45.90 })
  @IsNumber() 
  precoUnitario!: number;
  
  @ApiProperty({ description: 'Quantidade de itens vendidos', example: 2 })
  @IsInt() 
  quantidade!: number;
}



export class CreateVendaDto {

    @ApiProperty({ description: 'Status da venda',enum: VendaStatus, example: VendaStatus.CONCLUIDA })
    @IsEnum(VendaStatus, { message: 'Status inválido. Use CONCLUIDA, CANCELADA ou AGUARDANDO' })
    @IsNotEmpty({ message: 'O status da venda é obrigatório.' })
    status!: VendaStatus;

    @ApiProperty({ description: 'ID do cliente associado à venda', example: 1 })
    @IsNotEmpty({message: 'O cliente é obrigatório.'})
    @IsInt({ message: 'O clienteId deve ser um número inteiro' })
    clienteId!: number;

    @ApiProperty({ description: 'Itens da venda', type: [ItemVendaDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemVendaDto)
    itens!: ItemVendaDto[];

    @ApiProperty({ description: 'IDs dos serviços associados à venda', example: [1, 2, 3],type: [Number] })
    @IsArray()
    @IsInt({ each: true })
    servicosId!: number[];

}
