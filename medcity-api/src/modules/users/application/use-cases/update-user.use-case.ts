import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import {
  UserEmail,
  UserLastName,
  UserName,
  UserNumberDocument,
  UserNumberPhone,
  UserTypeDocument,
} from '../../domain/value-object';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(
    id: string,
    data: {
      name?: string;
      lastName?: string;
      typeDocument?: string;
      numberDocument?: string;
      email?: string;
      numberPhone?: string;
    },
  ): Promise<User> {
    if (!id) throw new Error('User id is required');

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const updateData = new User(
      id,
      data.name ? new UserName(data.name) : user.name,
      data.lastName ? new UserLastName(data.lastName) : user.lastName,
      data.typeDocument
        ? new UserTypeDocument(data.typeDocument)
        : user.typeDocument,
      data.numberDocument
        ? new UserNumberDocument(data.numberDocument)
        : user.numberDocument,
      data.email ? new UserEmail(data.email) : user.email,
      data.numberPhone
        ? new UserNumberPhone(data.numberPhone)
        : user.numberPhone,
      user.createdAt,
      new Date(),
    );

    const updatedUser = await this.userRepository.update(id, updateData);
    if (!updatedUser) throw new Error(`Failed to update user with id ${id}`);

    return updatedUser;
  }
}
