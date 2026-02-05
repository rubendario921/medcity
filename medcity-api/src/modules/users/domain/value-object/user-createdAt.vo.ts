export class UserCreatedAt {
  private createdAt: Date;

  constructor(createdAt?: Date) {
    if (createdAt && createdAt > new Date())
      throw new Error('Creation date cannot be in the future');
    this.createdAt = createdAt || new Date();
  }

  getValue(): Date {
    return this.createdAt;
  }
}
