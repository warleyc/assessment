import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOption, Option } from 'app/shared/model/option.model';
import { OptionService } from './option.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
  selector: 'jhi-option-update',
  templateUrl: './option-update.component.html'
})
export class OptionUpdateComponent implements OnInit {
  isSaving: boolean;

  questions: IQuestion[];

  categories: ICategory[];

  editForm = this.fb.group({
    id: [],
    text: [null, [Validators.required]],
    score: [null, [Validators.required]],
    question: [],
    category: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected optionService: OptionService,
    protected questionService: QuestionService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ option }) => {
      this.updateForm(option);
    });
    this.questionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestion[]>) => response.body)
      )
      .subscribe((res: IQuestion[]) => (this.questions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoryService
      .query({ filter: 'option-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          if (!this.editForm.get('category').value || !this.editForm.get('category').value.id) {
            this.categories = res;
          } else {
            this.categoryService
              .find(this.editForm.get('category').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICategory>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICategory>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICategory) => (this.categories = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(option: IOption) {
    this.editForm.patchValue({
      id: option.id,
      text: option.text,
      score: option.score,
      question: option.question,
      category: option.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const option = this.createFromForm();
    if (option.id !== undefined) {
      this.subscribeToSaveResponse(this.optionService.update(option));
    } else {
      this.subscribeToSaveResponse(this.optionService.create(option));
    }
  }

  private createFromForm(): IOption {
    return {
      ...new Option(),
      id: this.editForm.get(['id']).value,
      text: this.editForm.get(['text']).value,
      score: this.editForm.get(['score']).value,
      question: this.editForm.get(['question']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOption>>) {
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

  trackQuestionById(index: number, item: IQuestion) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
