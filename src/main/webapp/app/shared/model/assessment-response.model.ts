import { IQuestion } from 'app/shared/model/question.model';
import { IOption } from 'app/shared/model/option.model';

export interface IAssessmentResponse {
  id?: number;
  na?: boolean;
  reponse?: IQuestion;
  responses?: IOption[];
}

export class AssessmentResponse implements IAssessmentResponse {
  constructor(public id?: number, public na?: boolean, public reponse?: IQuestion, public responses?: IOption[]) {
    this.na = this.na || false;
  }
}
