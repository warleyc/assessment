import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPratice } from 'app/shared/model/pratice.model';
import { AccountService } from 'app/core';
import { PraticeService } from './pratice.service';

@Component({
  selector: 'jhi-pratice',
  templateUrl: './pratice.component.html'
})
export class PraticeComponent implements OnInit, OnDestroy {
  pratices: IPratice[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected praticeService: PraticeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.praticeService
      .query()
      .pipe(
        filter((res: HttpResponse<IPratice[]>) => res.ok),
        map((res: HttpResponse<IPratice[]>) => res.body)
      )
      .subscribe(
        (res: IPratice[]) => {
          this.pratices = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPratices();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPratice) {
    return item.id;
  }

  registerChangeInPratices() {
    this.eventSubscriber = this.eventManager.subscribe('praticeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
