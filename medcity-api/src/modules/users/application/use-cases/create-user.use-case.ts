import { User } from "../../domain/entities/user.entity";
import type { IUserRepository } from "../../domain/repositories/user.repository.interface";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(user: User): Promise<User> {
    if (!user || !user.email?.getValue()) {
      throw new Error("Data is null o empty");
    }

    const data = await this.userRepository.findByEmail(user.email?.getValue());
    if (data) {
      throw new Error(
        `User with email ${user.email?.getValue()} already exists`,
      );
    }

    const res = await this.userRepository.create(user);
    return res;
  }
}
