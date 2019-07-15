import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOption } from 'app/shared/model/option.model';
import { AccountService } from 'app/core';
import { OptionService } from './option.service';

@Component({
  selector: 'jhi-option',
  templateUrl: './option.component.html'
})
export class OptionComponent implements OnInit, OnDestroy {
  options: IOption[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected optionService: OptionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.optionService
      .query()
      .pipe(
        filter((res: HttpResponse<IOption[]>) => res.ok),
        map((res: HttpResponse<IOption[]>) => res.body)
      )
      .subscribe(
        (res: IOption[]) => {
          this.options = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOptions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOption) {
    return item.id;
  }

  registerChangeInOptions() {
    this.eventSubscriber = this.eventManager.subscribe('optionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
