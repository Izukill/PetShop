import { IsNotEmpty, IsNumber, IsDate, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemVendaDto {
    @IsInt() produtoId!: number;
    @IsInt() vendaId!: number;
    @IsNumber() precoUnitario!: number;
    @IsInt() quantidade!: number;
  }



export class CreateVendaDto {

    @IsNotEmpty({message: 'O valor total é obrigatório.'})
    @IsNumber({}, { message: 'O valor total deve ser um número' })
    valorTotal!: number;

    @IsNotEmpty({message: 'A data é obrigatória.'})
    @IsDate({ message: 'A data deve ser uma data válida' })
    data!: Date;

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
