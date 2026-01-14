import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class GetAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async run(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
