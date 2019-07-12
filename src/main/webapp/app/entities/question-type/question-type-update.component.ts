import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IQuestionType, QuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from './question-type.service';

@Component({
  selector: 'jhi-question-type-update',
  templateUrl: './question-type-update.component.html'
})
export class QuestionTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    countryName: []
  });

  constructor(protected questionTypeService: QuestionTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ questionType }) => {
      this.updateForm(questionType);
    });
  }

  updateForm(questionType: IQuestionType) {
    this.editForm.patchValue({
      id: questionType.id,
      countryName: questionType.countryName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const questionType = this.createFromForm();
    if (questionType.id !== undefined) {
      this.subscribeToSaveResponse(this.questionTypeService.update(questionType));
    } else {
      this.subscribeToSaveResponse(this.questionTypeService.create(questionType));
    }
  }

  private createFromForm(): IQuestionType {
    return {
      ...new QuestionType(),
      id: this.editForm.get(['id']).value,
      countryName: this.editForm.get(['countryName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionType>>) {
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
