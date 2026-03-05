export class RegistrationNumber {
  constructor(private readonly value: string) {
    if (!value || value.length < 5) {
      throw new Error('Registration number must be at least 5 characters long');
    }
  }

  getValue(): string {
    return this.value;
  }
}
