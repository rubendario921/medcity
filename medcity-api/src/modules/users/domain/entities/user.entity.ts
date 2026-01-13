import { UserEmail } from '../value-object/user-email.vo';
import { NumberDocument } from '../value-object/user-numberDocument.vo';
import { NumberPhone } from '../value-object/user-numberPhone.vo';

export class User {
  id: string;
  name: string;
  lastName: string;
  typeDocument?: string;
  numberDocument?: NumberDocument;
  email: UserEmail;
  numberPhone?: NumberPhone;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: UserEmail,
    numberDocument?: NumberDocument,
    numberPhone?: NumberPhone,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.numberDocument = numberDocument;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
