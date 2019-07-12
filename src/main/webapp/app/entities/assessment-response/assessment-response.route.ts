import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AssessmentResponseService } from './assessment-response.service';
import { AssessmentResponseComponent } from './assessment-response.component';
import { AssessmentResponseDetailComponent } from './assessment-response-detail.component';
import { AssessmentResponseUpdateComponent } from './assessment-response-update.component';
import { AssessmentResponseDeletePopupComponent } from './assessment-response-delete-dialog.component';
import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';

@Injectable({ providedIn: 'root' })
export class AssessmentResponseResolve implements Resolve<IAssessmentResponse> {
  constructor(private service: AssessmentResponseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAssessmentResponse> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AssessmentResponse>) => response.ok),
        map((assessmentResponse: HttpResponse<AssessmentResponse>) => assessmentResponse.body)
      );
    }
    return of(new AssessmentResponse());
  }
}

export const assessmentResponseRoute: Routes = [
  {
    path: '',
    component: AssessmentResponseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AssessmentResponses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AssessmentResponseDetailComponent,
    resolve: {
      assessmentResponse: AssessmentResponseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AssessmentResponses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AssessmentResponseUpdateComponent,
    resolve: {
      assessmentResponse: AssessmentResponseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AssessmentResponses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AssessmentResponseUpdateComponent,
    resolve: {
      assessmentResponse: AssessmentResponseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AssessmentResponses'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const assessmentResponsePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AssessmentResponseDeletePopupComponent,
    resolve: {
      assessmentResponse: AssessmentResponseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AssessmentResponses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
