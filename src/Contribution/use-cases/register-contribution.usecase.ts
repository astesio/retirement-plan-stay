import { Either, left, right } from '../../core/either';
import { Contribution } from '../../domain/entities/contribution.entity';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';
import { IUserRepository } from 'src/infra/persistence/ports/user-repository.interface';
import { InvalidContributionValueError } from '../../domain/errors/invalid-contribution-value.error';
import { IUsecase } from '../../core/usecase.interface';
import * as contributionRepositoryInterface from '../../infra/persistence/ports/contribution-repository.interface';

type ContributionRequest = { userId: string; value: number; vestingDate: Date };
type Error = UserNotFoundError | InvalidContributionValueError;
type ContributionResponse = Either<Error, Contribution>;

export class RegisterContributionUseCase
  implements IUsecase<ContributionRequest, ContributionResponse>
{
  constructor(
    // todo: entender porque o TS esta obrigado a passar dessa forma contributionRepositoryInterface.IContributionRepository,
    private readonly contributionRepository: contributionRepositoryInterface.IContributionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    value,
    vestingDate,
  }: ContributionRequest): Promise<ContributionResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    if (value <= 0) {
      return left(new InvalidContributionValueError());
    }

    const contribution = Contribution.create(
      userId,
      value,
      0, // redeemedValue
      new Date(),
      vestingDate,
    );

    const savedContribution =
      await this.contributionRepository.save(contribution);

    return right(savedContribution);
  }
}
