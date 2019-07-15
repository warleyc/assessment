import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from './question-type.service';
import { QuestionTypeComponent } from './question-type.component';
import { QuestionTypeDetailComponent } from './question-type-detail.component';
import { QuestionTypeUpdateComponent } from './question-type-update.component';
import { QuestionTypeDeletePopupComponent } from './question-type-delete-dialog.component';
import { IQuestionType } from 'app/shared/model/question-type.model';

@Injectable({ providedIn: 'root' })
export class QuestionTypeResolve implements Resolve<IQuestionType> {
  constructor(private service: QuestionTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestionType> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<QuestionType>) => response.ok),
        map((questionType: HttpResponse<QuestionType>) => questionType.body)
      );
    }
    return of(new QuestionType());
  }
}

export const questionTypeRoute: Routes = [
  {
    path: '',
    component: QuestionTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestionTypeDetailComponent,
    resolve: {
      questionType: QuestionTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestionTypeUpdateComponent,
    resolve: {
      questionType: QuestionTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestionTypeUpdateComponent,
    resolve: {
      questionType: QuestionTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const questionTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QuestionTypeDeletePopupComponent,
    resolve: {
      questionType: QuestionTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionTypes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
