export class UserResponseDto {
  id: string;
  name: string;
  lastName: string;
  typeDocument: string;
  numberDocument: string;
  email: string;
  numberPhone: string;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(data: {
    id: string;
    name: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    email: string;
    numberPhone: string;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.lastName = data.lastName;
    this.typeDocument = data.typeDocument;
    this.numberDocument = data.numberDocument;
    this.email = data.email;
    this.numberPhone = data.numberPhone;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
