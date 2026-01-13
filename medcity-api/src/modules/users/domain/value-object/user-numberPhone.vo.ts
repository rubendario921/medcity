export class NumberPhone {
  private readonly numberPhone: string;

  constructor(numberPhone: string) {
    if (!numberPhone.match(/^\d{10}$/))
      throw new Error('Invalid phone number format');
    this.numberPhone = numberPhone;
  }

  getValue(): string {
    return this.numberPhone;
  }
}
