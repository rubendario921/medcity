export class UserTypeDocument {
  private readonly type: string;

  constructor(type: string) {
    if (!this.isValidType(type)) {
      throw new Error('Invalid document type');
    }
    this.type = type;
  }

  private isValidType(type: string): boolean {
    const validTypes = ['ID', 'Passport', 'DriverLicense'];
    return validTypes.includes(type);
  }
  get value(): string {
    return this.type;
  }
}
