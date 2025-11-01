import { Contribution } from '../../domain/entities/contribution.entity';
import { BalanceVO } from '../../domain/value-objects/balance.vo';

export class BalanceCalculator {
  public static calculate(contributions: Contribution[]): BalanceVO {
    const currentDate = new Date();
    let total = 0;
    let availableForRedemption = 0;

    for (const contribution of contributions) {
      //todo: encontrar a melhor maneira possivel para lidar com valores monetarios, esta vindo como string do banco
      total += Number(contribution.value);

      if (contribution.isAvailableForRedemption(currentDate)) {
        //todo: encontrar a melhor maneira possivel para lidar com valores monetarios, esta vindo como string do banco
        availableForRedemption += Number(contribution.value);
      }
    }
    return new BalanceVO(total, availableForRedemption);
  }
}
