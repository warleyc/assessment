import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';

type EntityResponseType = HttpResponse<IAssessmentResponse>;
type EntityArrayResponseType = HttpResponse<IAssessmentResponse[]>;

@Injectable({ providedIn: 'root' })
export class AssessmentResponseService {
  public resourceUrl = SERVER_API_URL + 'api/assessment-responses';

  constructor(protected http: HttpClient) {}

  create(assessmentResponse: IAssessmentResponse): Observable<EntityResponseType> {
    return this.http.post<IAssessmentResponse>(this.resourceUrl, assessmentResponse, { observe: 'response' });
  }

  update(assessmentResponse: IAssessmentResponse): Observable<EntityResponseType> {
    return this.http.put<IAssessmentResponse>(this.resourceUrl, assessmentResponse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAssessmentResponse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssessmentResponse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
