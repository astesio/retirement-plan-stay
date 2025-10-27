import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
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

@Injectable()
export class RegisterContributionUseCase
  implements IUsecase<ContributionRequest, ContributionResponse>
{
  constructor(
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
      new Date(),
      vestingDate,
    );

    console.log('astrsio use case ', contribution);

    const savedContribution =
      await this.contributionRepository.save(contribution);

    return right(savedContribution);
  }
}
