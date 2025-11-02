/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Either, left, right } from '../../core/either';
import { Redemption } from '../entity/redemption.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { InsufficientBalanceError } from '../../domain/errors/insufficient-balance.error';
import { IContributionRepository } from '../../infra/persistence/ports/contribution-repository.interface';
import { ConsultBalanceUseCase } from '../../Balance/use-cases/consult-balance.usecase';
import { IUsecase } from '../../core/usecase.interface';
import { IUserRepository } from '../../infra/persistence/ports/user-repository.interface';
import { BalanceVO } from '../../domain/value-objects/balance.vo';
import { ConsumedContribution } from '../../domain/entities/contribution.entity';

export class InvalidValueRedemptionError extends Error {}

export type RequestRedemption = {
  userId: string;
  // Se 'value' for undefined ou null, significa resgate TOTAL.
  value?: number;
};

type ResponseRedemption = Either<
  UserNotFoundError | InsufficientBalanceError | InvalidValueRedemptionError,
  Redemption
>;

export class RequestRedemptionUseCase
  implements IUsecase<RequestRedemption, ResponseRedemption>
{
  constructor(
    private contributionRepository: IContributionRepository,
    private userRepository: IUserRepository,
    private consultBalanceUseCase: ConsultBalanceUseCase,
  ) {}

  async execute(request: RequestRedemption): Promise<ResponseRedemption> {
    const { userId, value } = request;
    let requestedValue = value;

    // duplicacao de codigo ver se existe algo para se fazer aqui
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    const balanceResult = await this.consultBalanceUseCase.execute({ userId });
    if (balanceResult.isLeft()) {
      throw balanceResult.value;
    }

    const balanceToParse: BalanceVO = balanceResult.value;
    const balance = balanceToParse.toJSON();
    const balanceAvailable = balance.availableForRedemption;

    if (requestedValue === undefined || requestedValue === null) {
      requestedValue = balanceAvailable;
    }

    if (requestedValue <= 0) {
      return left(
        new InvalidValueRedemptionError(
          'O valor de resgate deve ser positivo.',
        ),
      );
    }

    if (requestedValue > balanceAvailable) {
      return left(
        new InsufficientBalanceError(requestedValue, balanceAvailable),
      );
    }

    const availabeContributions =
      await this.contributionRepository.findAvailableByUserId(userId);

    if (availabeContributions.length === 0) {
      // melhrlar esse error depois com a ajuda da IA
      throw new Error('Não foi encontraro contribuiçoes para resgate');
    }

    const contributionsToUpdate: ConsumedContribution[] = [];
    let remainingValueToConsume = requestedValue;

    for (const contribution of availabeContributions) {
      if (requestedValue <= 0) {
        break;
      }

      const availabeInContribution =
        contribution.value - contribution.redeemedValue;

      const consumeAmount = Math.min(
        availabeInContribution,
        remainingValueToConsume,
      );

      if (consumeAmount > 0) {
        contributionsToUpdate.push({
          id: contribution.id,
          consumedValue: consumeAmount,
        });
        remainingValueToConsume -= consumeAmount;
      }
    }

    const redemption = Redemption.create(userId, requestedValue);

    await this.contributionRepository.saveRedemption(
      redemption,
      contributionsToUpdate,
    );

    return right(redemption);
  }
}
