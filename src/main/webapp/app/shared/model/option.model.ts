import { IQuestion } from 'app/shared/model/question.model';
import { ICategory } from 'app/shared/model/category.model';

export interface IOption {
  id?: number;
  options?: string;
  weight?: number;
  score?: number;
  question?: IQuestion;
  option?: ICategory;
}

export class Option implements IOption {
  constructor(
    public id?: number,
    public options?: string,
    public weight?: number,
    public score?: number,
    public question?: IQuestion,
    public option?: ICategory
  ) {}
}
