import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AccountService } from 'app/core';
import { AssessmentResponseService } from './assessment-response.service';

@Component({
  selector: 'jhi-assessment-response',
  templateUrl: './assessment-response.component.html'
})
export class AssessmentResponseComponent implements OnInit, OnDestroy {
  assessmentResponses: IAssessmentResponse[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected assessmentResponseService: AssessmentResponseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.assessmentResponseService
      .query()
      .pipe(
        filter((res: HttpResponse<IAssessmentResponse[]>) => res.ok),
        map((res: HttpResponse<IAssessmentResponse[]>) => res.body)
      )
      .subscribe(
        (res: IAssessmentResponse[]) => {
          this.assessmentResponses = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAssessmentResponses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAssessmentResponse) {
    return item.id;
  }

  registerChangeInAssessmentResponses() {
    this.eventSubscriber = this.eventManager.subscribe('assessmentResponseListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
