import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(id: string, user: User): Promise<User> {
    if (!id) throw new Error('User id is required');

    const data = await this.userRepository.findById(id);
    if (!data) throw new Error(`User with id ${id} not found`);

    data.name = user.name ?? data.name;
    data.lastName = user.lastName ?? data.lastName;
    data.typeDocument = user.typeDocument ?? data.typeDocument;
    data.numberDocument = user.numberDocument ?? data.numberDocument;
    data.email = user.email ?? data.email;
    data.numberPhone = user.numberPhone ?? data.numberPhone;

    const res = await this.userRepository.update(id, data);
    if (!res) throw new Error(`Failed to update user with id ${id}`);

    return res;
  }
}
