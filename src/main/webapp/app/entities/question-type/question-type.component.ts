import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionType } from 'app/shared/model/question-type.model';
import { AccountService } from 'app/core';
import { QuestionTypeService } from './question-type.service';

@Component({
  selector: 'jhi-question-type',
  templateUrl: './question-type.component.html'
})
export class QuestionTypeComponent implements OnInit, OnDestroy {
  questionTypes: IQuestionType[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected questionTypeService: QuestionTypeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.questionTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IQuestionType[]>) => res.ok),
        map((res: HttpResponse<IQuestionType[]>) => res.body)
      )
      .subscribe(
        (res: IQuestionType[]) => {
          this.questionTypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInQuestionTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuestionType) {
    return item.id;
  }

  registerChangeInQuestionTypes() {
    this.eventSubscriber = this.eventManager.subscribe('questionTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
