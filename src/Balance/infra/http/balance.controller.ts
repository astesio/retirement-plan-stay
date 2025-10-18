import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ConsultBalanceUseCase } from '../../use-cases/consult-balance.usecase';
import { ConsultBalanceDto } from '../../dto/consult-balance.dto';
import { EmptyBalanceError } from '../../../domain/errors/empty-balance.error';
import { Balance } from '../../../domain/value-objects/balance';

@Controller('v1/balance')
export class BalanceController {
  constructor(private readonly consultBalanceUseCase: ConsultBalanceUseCase) {}

  @Get(':userId')
  async getBalance(@Param() params: ConsultBalanceDto) {
    const result = await this.consultBalanceUseCase.execute({
      userId: params.userId,
    });

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof EmptyBalanceError) {
        throw new HttpException(
          {
            message: error.message,
            errorType: error.name,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        {
          message: 'Erro interno ao consultar saldo.',
          error: error.name,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const balance: Balance = result.value;

    return {
      ...balance,
      message: 'Saldo calculado com sucesso para o chatbot',
    };
  }
}
