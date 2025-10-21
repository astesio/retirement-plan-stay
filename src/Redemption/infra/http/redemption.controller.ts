/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body } from '@nestjs/common';

import { RequestRedemptionDto } from '../../dto/request-redemption.dto';
import {
  RequestRedemptionRequest,
  RequestRedemptionUseCase,
} from '../../use-cases/request-redemption.usecase';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorDto } from '../../../common/dto/api-error.dto';
import { ResponseRedemptionDto } from '../../dto/response-redemption.dto';

@ApiTags('Redemption')
@Controller('v1/redemption')
export class RedemptionController {
  constructor(
    private readonly requestRedemptionUseCase: RequestRedemptionUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Solicitação do Resgate de saldo bem-sucedido.',
  })
  @ApiResponse({
    status: 400,
    description: 'Saldo insuficiente ou dados inválidos.',
  })
  @ApiResponse({
    description:
      'Error de validação ou negócio (ex: Valor inválido para resgate)',
    type: ApiErrorDto,
  })
  async requestRedemption(
    @Body() body: RequestRedemptionDto,
  ): Promise<ResponseRedemptionDto> {
    const request: RequestRedemptionRequest = {
      userId: body.userId,
      value: body.value,
    };

    const result = await this.requestRedemptionUseCase.execute(request);

    if (result.isLeft()) {
      throw result.value;
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
