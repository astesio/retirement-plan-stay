/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Either, left, right } from '../../core/either';
import { Redemption } from '../entity/redemption.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { InsufficientBalanceError } from '../../domain/errors/insufficient-balance.error';
import { IContributionRepository } from '../../infra/persistence/ports/contribution-repository.interface';
import { ConsultBalanceUseCase } from '../../Balance/use-cases/consult-balance.usecase';

export class InvalidValueRedemptionError extends Error {}

export type RequestRedemptionRequest = {
  userId: string;
  // Se 'value' for undefined ou null, significa resgate TOTAL.
  value?: number;
};

type RequestRedemptionResponse = Either<
  UserNotFoundError | InsufficientBalanceError | InvalidValueRedemptionError,
  Redemption
>;

export class RequestRedemptionUseCase {
  constructor(
    private contributionRepository: IContributionRepository,
    private consultBalanceUseCase: ConsultBalanceUseCase,
  ) {}

  async execute(
    request: RequestRedemptionRequest,
  ): Promise<RequestRedemptionResponse> {
    const { userId, value } = request;
    const balanceResult = await this.consultBalanceUseCase.execute({ userId });

    if (balanceResult.isLeft()) {
      return left(balanceResult.value);
    }

    const balance = balanceResult.value;
    const balanceToJSON = balance.toJSON();
    const available = balanceToJSON.availableForRedemption;

    let redemptionValue = value;
    if (redemptionValue === undefined || redemptionValue === null) {
      redemptionValue = available;
    }

    if (redemptionValue <= 0) {
      return left(
        new InvalidValueRedemptionError(
          'O valor de resgate deve ser positivo.',
        ),
      );
    }

    if (redemptionValue > available) {
      return left(new InsufficientBalanceError(redemptionValue, available));
    }

    const redemption = Redemption.create(userId, redemptionValue);

    await this.contributionRepository.saveRedemption(redemption);
    return right(redemption);
  }
}
