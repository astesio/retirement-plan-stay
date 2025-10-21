import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponseDto {
  @ApiProperty({ description: 'Valor total do saldo.', example: 15000.5 })
  total: number;

  @ApiProperty({
    description: 'Valor disponível para resgate.',
    example: 8000.0,
  })
  availableForRedemption: number;

  @ApiProperty({
    description: 'Mensagem de retorno para o chatbot.',
    example: 'Saldo calculado com sucesso para o chatbot',
  })
  message: string;
}
