export class UserId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  get value(): string {
    return this.id;
  }
}
