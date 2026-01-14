import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserLastName } from '../../domain/value-object/user-lastName.vo';
import { UserName } from '../../domain/value-object/user-name.vo';
import { UserEmail } from '../../domain/value-object/user-email.vo';
import { UserNumberDocument } from '../../domain/value-object/user-numberDocument.vo';
import { UserNumberPhone } from '../../domain/value-object/user-numberPhone.vo';
import { UserCreatedAt } from '../../domain/value-object/user-createdAt.vo';
import { UserTypeDocument } from '../../domain/value-object/user-typeDocument.vo';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async run(data: {
    name: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    email: string;
    numberPhone: string;
  }): Promise<User> {
    //Validate User Data
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser)
      throw new Error(`User with email ${data.email} already exists`);

    //New User Data
    const newUser = new User(
      this.generateId(),
      new UserName(data.name),
      new UserLastName(data.lastName),
      new UserTypeDocument(data.typeDocument),
      new UserNumberDocument(data.numberDocument),
      new UserEmail(data.email),
      new UserNumberPhone(data.numberPhone),
      new UserCreatedAt(),
    );

    return this.userRepository.create(newUser);
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
