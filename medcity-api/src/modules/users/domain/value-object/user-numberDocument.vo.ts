export class NumberDocument {
  private readonly numberDocument: string;

  constructor(numberDocument: string) {
    if (!numberDocument.match(/^\d{8,12}$/))
      throw new Error('Invalid document number format');
    this.numberDocument = numberDocument;
  }

  getValue(): string {
    return this.numberDocument;
  }
}
