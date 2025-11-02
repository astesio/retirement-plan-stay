/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';

export class ContributionResponseDto {
  @ApiProperty({
    description: 'ID único do usuário no sistema.',
    example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
  })
  id: string;

  @ApiProperty({
    description: 'Id do usuário corrente',
    example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
  })
  userId: string;

  @ApiProperty({
    description: 'O valor desejado para resgate.',
    example: 8000.0,
  })
  value: number;

  @ApiProperty({
    description: 'O valor restante disponivel para ser sacado da contribuição.',
    example: 7000.0,
  })
  redeemedValue: number;

  @ApiProperty({
    description: 'O status atual do pedido de resgate.',
    example: '2025-10-15',
  })
  contributionDate: Date;

  @ApiProperty({
    description: 'Mensagem de retorno para o chatbot',
    example: '2025-10-15',
  })
  vestingDate: Date;
}
