export class UserName {
  private readonly name: string;

  constructor(name: string) {
    if (!name.match(/^[a-zA-Z\s]{2,50}$/))
      throw new Error('Invalid name format');
    this.name = name.toUpperCase();
  }

  getValue(): string {
    return this.name;
  }
}
