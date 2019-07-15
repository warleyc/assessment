import { IOption } from 'app/shared/model/option.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IAssessmentResponse {
  id?: number;
  na?: boolean;
  comment?: string;
  response?: IOption;
  reponse?: IQuestion;
}

export class AssessmentResponse implements IAssessmentResponse {
  constructor(public id?: number, public na?: boolean, public comment?: string, public response?: IOption, public reponse?: IQuestion) {
    this.na = this.na || false;
  }
}
