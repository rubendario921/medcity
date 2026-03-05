export class SpecialtyName {
  constructor(private readonly value: string) {
    if (!value || value.length < 3) {
      throw new Error('Specialty name must be at least 3 characters long');
    }
  }

  getValue(): string {
    return this.value;
  }
}
