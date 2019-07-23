import { IAnnotation } from 'app/shared/model/annotation.model';
import { IOption } from 'app/shared/model/option.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IAssessmentResponse {
  id?: number;
  na?: boolean;
  comment?: string;
  annotation?: IAnnotation;
  option?: IOption;
  question?: IQuestion;
}

export class AssessmentResponse implements IAssessmentResponse {
  constructor(
    public id?: number,
    public na?: boolean,
    public comment?: string,
    public annotation?: IAnnotation,
    public option?: IOption,
    public question?: IQuestion
  ) {
    this.na = this.na || false;
  }
}
