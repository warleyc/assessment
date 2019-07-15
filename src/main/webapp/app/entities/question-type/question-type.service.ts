import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuestionType } from 'app/shared/model/question-type.model';

type EntityResponseType = HttpResponse<IQuestionType>;
type EntityArrayResponseType = HttpResponse<IQuestionType[]>;

@Injectable({ providedIn: 'root' })
export class QuestionTypeService {
  public resourceUrl = SERVER_API_URL + 'api/question-types';

  constructor(protected http: HttpClient) {}

  create(questionType: IQuestionType): Observable<EntityResponseType> {
    return this.http.post<IQuestionType>(this.resourceUrl, questionType, { observe: 'response' });
  }

  update(questionType: IQuestionType): Observable<EntityResponseType> {
    return this.http.put<IQuestionType>(this.resourceUrl, questionType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestionType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
