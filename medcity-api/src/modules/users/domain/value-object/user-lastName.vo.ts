export class UserLastName {
  private readonly lastName: string;

  constructor(lastName: string) {
    if (!lastName.match(/^[a-zA-Z\s]{2,50}$/))
      throw new Error('Invalid last name format');
    this.lastName = lastName.toUpperCase();
  }

  getValue(): string {
    return this.lastName;
  }
}
