import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';
import { ICategory } from 'app/shared/model/category.model';

export interface IOption {
  id?: number;
  options?: string;
  weight?: number;
  score?: number;
  assessmentResponse?: IAssessmentResponse;
  option?: ICategory;
}

export class Option implements IOption {
  constructor(
    public id?: number,
    public options?: string,
    public weight?: number,
    public score?: number,
    public assessmentResponse?: IAssessmentResponse,
    public option?: ICategory
  ) {}
}
