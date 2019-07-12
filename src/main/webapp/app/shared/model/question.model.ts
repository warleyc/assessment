import { ICategory } from 'app/shared/model/category.model';
import { IQuestionType } from 'app/shared/model/question-type.model';

export interface IQuestion {
  id?: number;
  name?: string;
  text?: string;
  answerRequired?: boolean;
  question?: ICategory;
  question?: IQuestionType;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public name?: string,
    public text?: string,
    public answerRequired?: boolean,
    public question?: ICategory,
    public question?: IQuestionType
  ) {
    this.answerRequired = this.answerRequired || false;
  }
}
