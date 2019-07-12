import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssessment } from 'app/shared/model/assessment.model';

type EntityResponseType = HttpResponse<IAssessment>;
type EntityArrayResponseType = HttpResponse<IAssessment[]>;

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  public resourceUrl = SERVER_API_URL + 'api/assessments';

  constructor(protected http: HttpClient) {}

  create(assessment: IAssessment): Observable<EntityResponseType> {
    return this.http.post<IAssessment>(this.resourceUrl, assessment, { observe: 'response' });
  }

  update(assessment: IAssessment): Observable<EntityResponseType> {
    return this.http.put<IAssessment>(this.resourceUrl, assessment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAssessment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssessment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
