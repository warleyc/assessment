import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAssessment, Assessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from './assessment.service';
import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AssessmentResponseService } from 'app/entities/assessment-response';

@Component({
  selector: 'jhi-assessment-update',
  templateUrl: './assessment-update.component.html'
})
export class AssessmentUpdateComponent implements OnInit {
  isSaving: boolean;

  assessmentresponses: IAssessmentResponse[];
  lastModificationDp: any;

  editForm = this.fb.group({
    id: [],
    applicationName: [],
    assetOwner: [],
    techDivisionManager: [],
    applicationVersion: [],
    status: [],
    lastModification: [],
    information: [],
    assessmentResponse: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected assessmentService: AssessmentService,
    protected assessmentResponseService: AssessmentResponseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ assessment }) => {
      this.updateForm(assessment);
    });
    this.assessmentResponseService
      .query({ filter: 'assessment-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAssessmentResponse[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAssessmentResponse[]>) => response.body)
      )
      .subscribe(
        (res: IAssessmentResponse[]) => {
          if (!this.editForm.get('assessmentResponse').value || !this.editForm.get('assessmentResponse').value.id) {
            this.assessmentresponses = res;
          } else {
            this.assessmentResponseService
              .find(this.editForm.get('assessmentResponse').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAssessmentResponse>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAssessmentResponse>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAssessmentResponse) => (this.assessmentresponses = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(assessment: IAssessment) {
    this.editForm.patchValue({
      id: assessment.id,
      applicationName: assessment.applicationName,
      assetOwner: assessment.assetOwner,
      techDivisionManager: assessment.techDivisionManager,
      applicationVersion: assessment.applicationVersion,
      status: assessment.status,
      lastModification: assessment.lastModification,
      information: assessment.information,
      assessmentResponse: assessment.assessmentResponse
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const assessment = this.createFromForm();
    if (assessment.id !== undefined) {
      this.subscribeToSaveResponse(this.assessmentService.update(assessment));
    } else {
      this.subscribeToSaveResponse(this.assessmentService.create(assessment));
    }
  }

  private createFromForm(): IAssessment {
    return {
      ...new Assessment(),
      id: this.editForm.get(['id']).value,
      applicationName: this.editForm.get(['applicationName']).value,
      assetOwner: this.editForm.get(['assetOwner']).value,
      techDivisionManager: this.editForm.get(['techDivisionManager']).value,
      applicationVersion: this.editForm.get(['applicationVersion']).value,
      status: this.editForm.get(['status']).value,
      lastModification: this.editForm.get(['lastModification']).value,
      information: this.editForm.get(['information']).value,
      assessmentResponse: this.editForm.get(['assessmentResponse']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssessment>>) {
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
}
