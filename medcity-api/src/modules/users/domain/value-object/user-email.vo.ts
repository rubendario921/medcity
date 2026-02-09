export class UserEmail {
  private readonly email: string;

  constructor(email: string) {
    let data = email?.trim().toLowerCase();
    if (!data || !data.includes("@")) {
      throw new Error("Invalid email format");
    }

    this.email = data;
  }

  getValue(): string {
    return this.email;
  }
}
