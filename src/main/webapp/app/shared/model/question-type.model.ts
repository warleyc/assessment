export interface IQuestionType {
  id?: number;
  type?: string;
}

export class QuestionType implements IQuestionType {
  constructor(public id?: number, public type?: string) {}
}
