import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty({
    description: 'A mensagem de erro detalahda.',
    example: 'O Saldo disponível para resgate ou aplicação é zero',
  })
  message: string;

  @ApiProperty({
    description: 'O tipo (nome) da exceção de domínimo.',
    example: 'EmptyBalanceError',
  })
  errorType: string;

  @ApiProperty({
    description: 'O código de status HTTP.',
    example: 400,
  })
  statusCode: number;
}
