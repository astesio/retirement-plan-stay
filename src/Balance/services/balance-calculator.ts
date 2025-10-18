import { Contribution } from '../../domain/entities/contribution';
import { Balance } from '../../domain/value-objects/balance';

export class BalanceCalculator {
  public static calculate(contributions: Contribution[]): Balance {
    const currentDate = new Date();
    let total = 0;
    let availableForRedemption = 0;

    for (const contribution of contributions) {
      total += contribution.value;
      if (contribution.isAvailableForRedemption(currentDate)) {
        availableForRedemption += contribution.value;
      }
    }
    return new Balance(total, availableForRedemption);
  }
}
