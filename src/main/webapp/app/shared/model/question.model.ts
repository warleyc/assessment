import { ICategory } from 'app/shared/model/category.model';
import { IQuestionType } from 'app/shared/model/question-type.model';
import { IOption } from 'app/shared/model/option.model';

export interface IQuestion {
  id?: number;
  name?: string;
  text?: string;
  answerRequired?: boolean;
  category?: ICategory;
  questionType?: IQuestionType;
  options?: IOption[];
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public name?: string,
    public text?: string,
    public answerRequired?: boolean,
    public category?: ICategory,
    public questionType?: IQuestionType,
    public options?: IOption[]
  ) {
    this.answerRequired = this.answerRequired || false;
  }
}
