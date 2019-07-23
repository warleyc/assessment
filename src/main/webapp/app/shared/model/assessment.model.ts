import { Moment } from 'moment';
import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';

export const enum STATUS {
  DRAFT = 'DRAFT',
  VALIDATE = 'VALIDATE',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface IAssessment {
  id?: number;
  applicationName?: string;
  assetOwner?: string;
  techDivisionManager?: string;
  applicationVersion?: string;
  status?: STATUS;
  lastModification?: Moment;
  assessmentResponse?: IAssessmentResponse;
}

export class Assessment implements IAssessment {
  constructor(
    public id?: number,
    public applicationName?: string,
    public assetOwner?: string,
    public techDivisionManager?: string,
    public applicationVersion?: string,
    public status?: STATUS,
    public lastModification?: Moment,
    public assessmentResponse?: IAssessmentResponse
  ) {}
}
