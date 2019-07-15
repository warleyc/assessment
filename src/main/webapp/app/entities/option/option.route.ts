import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Option } from 'app/shared/model/option.model';
import { OptionService } from './option.service';
import { OptionComponent } from './option.component';
import { OptionDetailComponent } from './option-detail.component';
import { OptionUpdateComponent } from './option-update.component';
import { OptionDeletePopupComponent } from './option-delete-dialog.component';
import { IOption } from 'app/shared/model/option.model';

@Injectable({ providedIn: 'root' })
export class OptionResolve implements Resolve<IOption> {
  constructor(private service: OptionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOption> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Option>) => response.ok),
        map((option: HttpResponse<Option>) => option.body)
      );
    }
    return of(new Option());
  }
}

export const optionRoute: Routes = [
  {
    path: '',
    component: OptionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Options'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OptionDetailComponent,
    resolve: {
      option: OptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Options'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OptionUpdateComponent,
    resolve: {
      option: OptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Options'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OptionUpdateComponent,
    resolve: {
      option: OptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Options'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const optionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OptionDeletePopupComponent,
    resolve: {
      option: OptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Options'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
