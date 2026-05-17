import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsArray,
  ValidateNested,
  IsEnum,
  IsString,
} from 'class-validator';
import { VendaStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ItemVendaDto {
  @ApiProperty({ description: 'lookupId do produto', example: 10 })
  @IsString()
  produtolookupId!: string;

  @ApiProperty({ description: 'Preço cobrado por unidade', example: 45.9 })
  @IsNumber()
  precoUnitario!: number;

  @ApiProperty({ description: 'Quantidade de itens vendidos', example: 2 })
  @IsInt()
  quantidade!: number;
}

export class CreateVendaDto {
  @ApiProperty({
    description: 'Status da venda',
    enum: VendaStatus,
    example: VendaStatus.CONCLUIDA,
  })
  @IsEnum(VendaStatus, {
    message: 'Status inválido. Use CONCLUIDA, CANCELADA ou AGUARDANDO',
  })
  @IsNotEmpty({ message: 'O status da venda é obrigatório.' })
  status!: VendaStatus;

  @ApiProperty({
    description: 'lookupId do cliente associado à venda',
    example: 1,
  })
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  @IsString({ message: 'lookupId do cliente deve ser uma string' })
  clientelookupId!: string;

  @ApiProperty({ description: 'Itens da venda', type: [ItemVendaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemVendaDto)
  itens!: ItemVendaDto[];

  @ApiProperty({
    description: 'lookupIds dos serviços associados à venda',
    example: ['as%$¨Tgdfsdf', 'ADvfdser1234f', '#5gfsdGsgr'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  servicoslookupId!: string[];
}
