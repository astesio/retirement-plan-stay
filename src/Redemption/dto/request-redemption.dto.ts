/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RequestRedemptionDto {
  @ApiProperty({
    description: 'ID único do usuário no sistema.',
    example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;

  @ApiProperty({
    description: 'Valor do saldo a ser resgatado.',
    example: '10',
  })
  @IsNumber()
  @IsOptional()
  value?: number;
}
