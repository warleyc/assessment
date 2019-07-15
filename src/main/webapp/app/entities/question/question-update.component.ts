import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { IQuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from 'app/entities/question-type';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  questions: ICategory[];

  questions: IQuestionType[];

  editForm = this.fb.group({
    id: [],
    name: [],
    text: [],
    answerRequired: [],
    question: [],
    question: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionService: QuestionService,
    protected categoryService: CategoryService,
    protected questionTypeService: QuestionTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);
    });
    this.categoryService
      .query({ filter: 'question-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          if (!this.editForm.get('question').value || !this.editForm.get('question').value.id) {
            this.questions = res;
          } else {
            this.categoryService
              .find(this.editForm.get('question').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICategory>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICategory>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICategory) => (this.questions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.questionTypeService
      .query({ filter: 'question-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestionType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestionType[]>) => response.body)
      )
      .subscribe(
        (res: IQuestionType[]) => {
          if (!this.editForm.get('question').value || !this.editForm.get('question').value.id) {
            this.questions = res;
          } else {
            this.questionTypeService
              .find(this.editForm.get('question').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IQuestionType>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IQuestionType>) => subResponse.body)
              )
              .subscribe(
                (subRes: IQuestionType) => (this.questions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(question: IQuestion) {
    this.editForm.patchValue({
      id: question.id,
      name: question.name,
      text: question.text,
      answerRequired: question.answerRequired,
      question: question.question,
      question: question.question
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  private createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      text: this.editForm.get(['text']).value,
      answerRequired: this.editForm.get(['answerRequired']).value,
      question: this.editForm.get(['question']).value,
      question: this.editForm.get(['question']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackQuestionTypeById(index: number, item: IQuestionType) {
    return item.id;
  }
}
