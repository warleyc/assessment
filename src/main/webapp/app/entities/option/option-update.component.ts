import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOption, Option } from 'app/shared/model/option.model';
import { OptionService } from './option.service';
import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AssessmentResponseService } from 'app/entities/assessment-response';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';

@Component({
  selector: 'jhi-option-update',
  templateUrl: './option-update.component.html'
})
export class OptionUpdateComponent implements OnInit {
  isSaving: boolean;

  assessmentresponses: IAssessmentResponse[];

  options: ICategory[];

  editForm = this.fb.group({
    id: [],
    options: [null, [Validators.required]],
    weight: [null, [Validators.required]],
    score: [null, [Validators.required]],
    assessmentResponse: [],
    option: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected optionService: OptionService,
    protected assessmentResponseService: AssessmentResponseService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ option }) => {
      this.updateForm(option);
    });
    this.assessmentResponseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAssessmentResponse[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAssessmentResponse[]>) => response.body)
      )
      .subscribe((res: IAssessmentResponse[]) => (this.assessmentresponses = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoryService
      .query({ filter: 'option-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe(
        (res: ICategory[]) => {
          if (!this.editForm.get('option').value || !this.editForm.get('option').value.id) {
            this.options = res;
          } else {
            this.categoryService
              .find(this.editForm.get('option').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICategory>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICategory>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICategory) => (this.options = [subRes].concat(res)),
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
      options: option.options,
      weight: option.weight,
      score: option.score,
      assessmentResponse: option.assessmentResponse,
      option: option.option
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
      options: this.editForm.get(['options']).value,
      weight: this.editForm.get(['weight']).value,
      score: this.editForm.get(['score']).value,
      assessmentResponse: this.editForm.get(['assessmentResponse']).value,
      option: this.editForm.get(['option']).value
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

  trackAssessmentResponseById(index: number, item: IAssessmentResponse) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }
}
