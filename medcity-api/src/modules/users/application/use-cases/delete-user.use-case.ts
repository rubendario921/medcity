import { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(id: string): Promise<boolean> {
    if (!id) throw new Error('User id is required');

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    return this.userRepository.delete(id);
  }
}
