export class UserEmail {
  private readonly email: string;

  constructor(email: string) {
    if (!email.includes('@')) throw new Error('Invalid email format');
    this.email = email;
  }

  getValue(): string {
    return this.email;
  }
}
