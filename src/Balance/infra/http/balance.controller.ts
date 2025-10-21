import { Controller, Get, Param } from '@nestjs/common';
import { ConsultBalanceUseCase } from '../../use-cases/consult-balance.usecase';
import { ConsultBalanceDto } from '../../dto/request-consult-balance.dto';
import { Balance } from '../../../domain/value-objects/balance.vo';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDto } from '../../../common/dto/api-error.dto';
import { BalanceResponseDto } from '../../dto/response-balance-response.dto';

@ApiTags('Balance')
@Controller('v1/balance')
export class BalanceController {
  constructor(private readonly consultBalanceUseCase: ConsultBalanceUseCase) {}

  @Get(':userId')
  @ApiOkResponse({
    description: 'Consulta de saldo bem-sucedida.',
    type: BalanceResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo Vazio ou dados inválidos.',
    type: ApiErrorDto,
  })
  async getBalance(
    @Param() params: ConsultBalanceDto,
  ): Promise<BalanceResponseDto> {
    const result = await this.consultBalanceUseCase.execute({
      userId: params.userId,
    });

    if (result.isLeft()) {
      throw result.value;
    }

    const balance: Balance = result.value;

    return {
      ...balance,
      message: 'Saldo calculado com sucesso para o chatbot',
    } as BalanceResponseDto;
  }
}
