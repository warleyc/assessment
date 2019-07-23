import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAnnotation, Annotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from './annotation.service';

@Component({
  selector: 'jhi-annotation-update',
  templateUrl: './annotation-update.component.html'
})
export class AnnotationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    test: []
  });

  constructor(protected annotationService: AnnotationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ annotation }) => {
      this.updateForm(annotation);
    });
  }

  updateForm(annotation: IAnnotation) {
    this.editForm.patchValue({
      id: annotation.id,
      test: annotation.test
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const annotation = this.createFromForm();
    if (annotation.id !== undefined) {
      this.subscribeToSaveResponse(this.annotationService.update(annotation));
    } else {
      this.subscribeToSaveResponse(this.annotationService.create(annotation));
    }
  }

  private createFromForm(): IAnnotation {
    return {
      ...new Annotation(),
      id: this.editForm.get(['id']).value,
      test: this.editForm.get(['test']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
