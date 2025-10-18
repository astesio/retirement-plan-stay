export class Balance {
  private readonly total: number;
  private readonly availableForRedemption: number;

  constructor(total: number, availableForRedemption: number) {
    this.total = total;
    this.availableForRedemption = availableForRedemption;
  }

  public toJSON() {
    return {
      total: this.total,
      availableForRedemption: this.availableForRedemption,
    };
  }
}
