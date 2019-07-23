import { IQuestion } from 'app/shared/model/question.model';
import { ICategory } from 'app/shared/model/category.model';

export interface IOption {
  id?: number;
  text?: string;
  score?: number;
  question?: IQuestion;
  category?: ICategory;
}

export class Option implements IOption {
  constructor(public id?: number, public text?: string, public score?: number, public question?: IQuestion, public category?: ICategory) {}
}
