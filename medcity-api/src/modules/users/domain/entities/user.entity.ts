import { UserCreatedAt } from '../value-object/user-createdAt.vo';
import { UserEmail } from '../value-object/user-email.vo';
import { UserLastName } from '../value-object/user-lastName.vo';
import { UserName } from '../value-object/user-name.vo';
import { NumberDocument } from '../value-object/user-numberDocument.vo';
import { NumberPhone } from '../value-object/user-numberPhone.vo';

export class User {
  id: string;
  name: UserName;
  lastName: UserLastName;
  typeDocument?: string;
  numberDocument?: NumberDocument;
  email: UserEmail;
  numberPhone?: NumberPhone;
  createdAt: UserCreatedAt;
  updatedAt: Date;

  constructor(
    id: string,
    name: UserName,
    lastName: UserLastName,
    email: UserEmail,
    numberDocument?: NumberDocument,
    numberPhone?: NumberPhone,
    createdAt?: UserCreatedAt,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.numberDocument = numberDocument;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt || new UserCreatedAt();
    this.updatedAt = updatedAt || new Date();
  }
}
