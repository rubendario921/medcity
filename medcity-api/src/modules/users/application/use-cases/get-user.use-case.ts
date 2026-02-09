import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(id: string): Promise<User> {
    if (!id) throw new Error('User id is required');

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    return user;
  }
}
