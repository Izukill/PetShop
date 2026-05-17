import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Rua solón de lucena',
  })
  @IsNotEmpty({ message: 'A rua é obrigatória.' })
  @IsString({ message: 'A rua deve ser uma string.' })
  rua!: string;

  @ApiProperty({ description: 'Número do endereço', example: '210' })
  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsString({ message: 'O número deve ser uma string.' })
  numero!: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'Ao lado do mercado',
  })
  @IsString({ message: 'O complemento deve ser uma string.' })
  complemento?: string;

  @ApiProperty({ description: 'CEP do endereço', example: '89080-000' })
  @IsNotEmpty({ message: 'O cep é obrigatório.' })
  @IsString({ message: 'O cep deve ser uma string.' })
  cep!: string;

  @ApiProperty({
    description: 'LookupId do cliente associado ao endereço',
    example: 1,
  })
  @IsNotEmpty({ message: 'O cliente é obrigatório.' })
  @IsString({ message: 'O clientelookupId deve ser uma string.' })
  clientelookupId!: string;
}
