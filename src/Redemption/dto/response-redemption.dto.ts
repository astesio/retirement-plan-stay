import { ApiProperty } from '@nestjs/swagger';
import { RedemptionStatus } from '../entity/redemption.entity';

export class ResponseRedemptionDto {
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
    description: 'O status atual do pedido de resgate.',
    enum: RedemptionStatus,
    example: RedemptionStatus.PENDING,
  })
  status: RedemptionStatus;

  @ApiProperty({
    description: 'Mensagem de retorno para o chatbot',
    example: 'Solicitação de resgate processada com sucesso. Status PENDENTE.',
  })
  message: string;
}
