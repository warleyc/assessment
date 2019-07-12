import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssessment } from 'app/shared/model/assessment.model';
import { AccountService } from 'app/core';
import { AssessmentService } from './assessment.service';

@Component({
  selector: 'jhi-assessment',
  templateUrl: './assessment.component.html'
})
export class AssessmentComponent implements OnInit, OnDestroy {
  assessments: IAssessment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected assessmentService: AssessmentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.assessmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IAssessment[]>) => res.ok),
        map((res: HttpResponse<IAssessment[]>) => res.body)
      )
      .subscribe(
        (res: IAssessment[]) => {
          this.assessments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAssessments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAssessment) {
    return item.id;
  }

  registerChangeInAssessments() {
    this.eventSubscriber = this.eventManager.subscribe('assessmentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
