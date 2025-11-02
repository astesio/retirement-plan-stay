import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterContributionUseCase } from '../../use-cases/register-contribution.usecase';
import { RegisterContributionRequestDto } from '../../dto/register-contribution-request.dto';
import { ContributionResponseDto } from '../../dto/register-contribution-response.dto';

@ApiTags('Contribution')
@Controller('v1/contributions')
export class ContributionController {
  constructor(
    private readonly registerContributionUseCase: RegisterContributionUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async register(
    @Body() request: RegisterContributionRequestDto,
  ): Promise<ContributionResponseDto> {
    const result = await this.registerContributionUseCase.execute(request);

    if (result.isLeft()) {
      throw result.value;
    }

    const contribution = result.value;

    return {
      id: contribution.id,
      userId: contribution.userId,
      value: contribution.value,
      redeemedValue: contribution.redeemedValue,
      contributionDate: contribution.contributionDate,
      vestingDate: contribution.vestingDate,
    };
  }
}
