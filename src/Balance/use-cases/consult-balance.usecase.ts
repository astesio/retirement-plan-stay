import { Either, left, right } from '../../core/either';
import { IUsecase } from '../../core/usecase.interface';
import { EmptyBalanceError } from '../../domain/errors/empty-balance.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { Balance } from '../../domain/value-objects/balance.vo';
import { IContributionRepository } from '../../infra/persistence/ports/contribution-repository.interface';
import { IUserRepository } from '../../infra/persistence/ports/user-repository.interface';
import { BalanceCalculator } from '../services/balance-calculator';

export type ConsultBalanceRequest = {
  userId: string;
};
export type ConsultBalanceResponse = Either<Error, Balance>;

export class ConsultBalanceUseCase
  implements IUsecase<ConsultBalanceRequest, ConsultBalanceResponse>
{
  constructor(
    private contributionRepository: IContributionRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
  }: ConsultBalanceRequest): Promise<ConsultBalanceResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    const contributions =
      await this.contributionRepository.findByUserId(userId);

    if (contributions.length === 0) {
      return left(new EmptyBalanceError(userId));
    }

    const balance = BalanceCalculator.calculate(contributions);
    const balanceToJSON = balance.toJSON();

    if (balanceToJSON.total === 0) {
      return left(new EmptyBalanceError(userId));
    }

    return right(balance);
  }
}
