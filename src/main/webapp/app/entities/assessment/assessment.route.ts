import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Assessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from './assessment.service';
import { AssessmentComponent } from './assessment.component';
import { AssessmentDetailComponent } from './assessment-detail.component';
import { AssessmentUpdateComponent } from './assessment-update.component';
import { AssessmentDeletePopupComponent } from './assessment-delete-dialog.component';
import { IAssessment } from 'app/shared/model/assessment.model';

@Injectable({ providedIn: 'root' })
export class AssessmentResolve implements Resolve<IAssessment> {
  constructor(private service: AssessmentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAssessment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Assessment>) => response.ok),
        map((assessment: HttpResponse<Assessment>) => assessment.body)
      );
    }
    return of(new Assessment());
  }
}

export const assessmentRoute: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Assessments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AssessmentDetailComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Assessments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AssessmentUpdateComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Assessments'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AssessmentUpdateComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Assessments'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const assessmentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AssessmentDeletePopupComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Assessments'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
