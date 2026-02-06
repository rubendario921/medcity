import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

export class GetAllUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async run(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
