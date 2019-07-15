import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPratice } from 'app/shared/model/pratice.model';

type EntityResponseType = HttpResponse<IPratice>;
type EntityArrayResponseType = HttpResponse<IPratice[]>;

@Injectable({ providedIn: 'root' })
export class PraticeService {
  public resourceUrl = SERVER_API_URL + 'api/pratices';

  constructor(protected http: HttpClient) {}

  create(pratice: IPratice): Observable<EntityResponseType> {
    return this.http.post<IPratice>(this.resourceUrl, pratice, { observe: 'response' });
  }

  update(pratice: IPratice): Observable<EntityResponseType> {
    return this.http.put<IPratice>(this.resourceUrl, pratice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPratice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPratice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
