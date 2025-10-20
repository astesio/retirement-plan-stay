/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { InsufficientBalanceError } from '../../../domain/errors/insufficient-balance.error';
import { RequestRedemptionDto } from '../../dto/request-redemption.dto';
import {
  InvalidValueRedemptionError,
  RequestRedemptionRequest,
  RequestRedemptionUseCase,
} from '../../use-cases/request-redemption.usecase';

@Controller('v1/redemption')
export class RedemptionController {
  constructor(
    private readonly requestRedemptionUseCase: RequestRedemptionUseCase,
  ) {}

  @Post()
  async requestRedemption(@Body() body: RequestRedemptionDto) {
    const request: RequestRedemptionRequest = {
      userId: body.userId,
      value: body.value,
    };

    const result = await this.requestRedemptionUseCase.execute(request);

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof InvalidValueRedemptionError) {
        throw new HttpException(
          { message: error.message, errorType: 'INVALID_VALUE' },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof InsufficientBalanceError) {
        throw new HttpException(
          { message: error.message, errorType: 'INSUFFICIENT_BALANCE' },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof UserNotFoundError) {
        throw new HttpException(
          { message: 'Usuário não encontrado.', errorType: 'USER_NOT_FOUND' },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: 'Falha interna ao processar resgate.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const redemption = result.value;

    return {
      id: redemption.id,
      userId: redemption.userId,
      value: redemption.value,
      status: redemption.status,
      message:
        'Solicitação de resgate processada com sucesso. Status PENDENTE.',
    };
  }
}
