/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConsultBalanceDto {
  @ApiProperty({
    description: 'ID único do usuário no sistema.',
    example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
}
