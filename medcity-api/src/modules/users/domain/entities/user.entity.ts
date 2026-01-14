import { UserCreatedAt } from '../value-object/user-createdAt.vo';
import { UserEmail } from '../value-object/user-email.vo';
import { UserLastName } from '../value-object/user-lastName.vo';
import { UserName } from '../value-object/user-name.vo';
import { UserNumberDocument } from '../value-object/user-numberDocument.vo';
import { UserNumberPhone } from '../value-object/user-numberPhone.vo';
import { UserTypeDocument } from '../value-object/user-typeDocument.vo';

export class User {
  id: string;
  name: UserName;
  lastName: UserLastName;
  typeDocument: UserTypeDocument;
  numberDocument: UserNumberDocument;
  email: UserEmail;
  numberPhone: UserNumberPhone;
  createdAt: UserCreatedAt;
  updatedAt: Date;

  constructor(
    id: string,
    name: UserName,
    lastName: UserLastName,
    typeDocument: UserTypeDocument,
    numberDocument: UserNumberDocument,
    email: UserEmail,
    numberPhone: UserNumberPhone,
    createdAt: UserCreatedAt,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.typeDocument = typeDocument;
    this.numberDocument = numberDocument;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt || new Date();
  }
}
