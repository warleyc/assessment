export interface IQuestionType {
  id?: number;
  countryName?: string;
}

export class QuestionType implements IQuestionType {
  constructor(public id?: number, public countryName?: string) {}
}
