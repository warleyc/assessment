import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pratice } from 'app/shared/model/pratice.model';
import { PraticeService } from './pratice.service';
import { PraticeComponent } from './pratice.component';
import { PraticeDetailComponent } from './pratice-detail.component';
import { PraticeUpdateComponent } from './pratice-update.component';
import { PraticeDeletePopupComponent } from './pratice-delete-dialog.component';
import { IPratice } from 'app/shared/model/pratice.model';

@Injectable({ providedIn: 'root' })
export class PraticeResolve implements Resolve<IPratice> {
  constructor(private service: PraticeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPratice> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Pratice>) => response.ok),
        map((pratice: HttpResponse<Pratice>) => pratice.body)
      );
    }
    return of(new Pratice());
  }
}

export const praticeRoute: Routes = [
  {
    path: '',
    component: PraticeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pratices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PraticeDetailComponent,
    resolve: {
      pratice: PraticeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pratices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PraticeUpdateComponent,
    resolve: {
      pratice: PraticeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pratices'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PraticeUpdateComponent,
    resolve: {
      pratice: PraticeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pratices'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const praticePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PraticeDeletePopupComponent,
    resolve: {
      pratice: PraticeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pratices'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
