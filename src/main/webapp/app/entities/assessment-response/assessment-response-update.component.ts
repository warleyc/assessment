import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAssessmentResponse, AssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AssessmentResponseService } from './assessment-response.service';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation';
import { IOption } from 'app/shared/model/option.model';
import { OptionService } from 'app/entities/option';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';

@Component({
  selector: 'jhi-assessment-response-update',
  templateUrl: './assessment-response-update.component.html'
})
export class AssessmentResponseUpdateComponent implements OnInit {
  isSaving: boolean;

  annotations: IAnnotation[];

  options: IOption[];

  questions: IQuestion[];

  editForm = this.fb.group({
    id: [],
    na: [],
    comment: [],
    annotation: [],
    option: [],
    question: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected assessmentResponseService: AssessmentResponseService,
    protected annotationService: AnnotationService,
    protected optionService: OptionService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ assessmentResponse }) => {
      this.updateForm(assessmentResponse);
    });
    this.annotationService
      .query({ filter: 'assessmentresponse-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAnnotation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAnnotation[]>) => response.body)
      )
      .subscribe(
        (res: IAnnotation[]) => {
          if (!this.editForm.get('annotation').value || !this.editForm.get('annotation').value.id) {
            this.annotations = res;
          } else {
            this.annotationService
              .find(this.editForm.get('annotation').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAnnotation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAnnotation>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAnnotation) => (this.annotations = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.optionService
      .query({ filter: 'assessmentresponse-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IOption[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOption[]>) => response.body)
      )
      .subscribe(
        (res: IOption[]) => {
          if (!this.editForm.get('option').value || !this.editForm.get('option').value.id) {
            this.options = res;
          } else {
            this.optionService
              .find(this.editForm.get('option').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IOption>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IOption>) => subResponse.body)
              )
              .subscribe(
                (subRes: IOption) => (this.options = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.questionService
      .query({ filter: 'assessmentresponse-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestion[]>) => response.body)
      )
      .subscribe(
        (res: IQuestion[]) => {
          if (!this.editForm.get('question').value || !this.editForm.get('question').value.id) {
            this.questions = res;
          } else {
            this.questionService
              .find(this.editForm.get('question').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IQuestion>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IQuestion>) => subResponse.body)
              )
              .subscribe(
                (subRes: IQuestion) => (this.questions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(assessmentResponse: IAssessmentResponse) {
    this.editForm.patchValue({
      id: assessmentResponse.id,
      na: assessmentResponse.na,
      comment: assessmentResponse.comment,
      annotation: assessmentResponse.annotation,
      option: assessmentResponse.option,
      question: assessmentResponse.question
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const assessmentResponse = this.createFromForm();
    if (assessmentResponse.id !== undefined) {
      this.subscribeToSaveResponse(this.assessmentResponseService.update(assessmentResponse));
    } else {
      this.subscribeToSaveResponse(this.assessmentResponseService.create(assessmentResponse));
    }
  }

  private createFromForm(): IAssessmentResponse {
    return {
      ...new AssessmentResponse(),
      id: this.editForm.get(['id']).value,
      na: this.editForm.get(['na']).value,
      comment: this.editForm.get(['comment']).value,
      annotation: this.editForm.get(['annotation']).value,
      option: this.editForm.get(['option']).value,
      question: this.editForm.get(['question']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssessmentResponse>>) {
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

  trackAnnotationById(index: number, item: IAnnotation) {
    return item.id;
  }

  trackOptionById(index: number, item: IOption) {
    return item.id;
  }

  trackQuestionById(index: number, item: IQuestion) {
    return item.id;
  }
}
