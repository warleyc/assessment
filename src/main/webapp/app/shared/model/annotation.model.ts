export interface IAnnotation {
  id?: number;
  test?: string;
}

export class Annotation implements IAnnotation {
  constructor(public id?: number, public test?: string) {}
}
