import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPratice, Pratice } from 'app/shared/model/pratice.model';
import { PraticeService } from './pratice.service';

@Component({
  selector: 'jhi-pratice-update',
  templateUrl: './pratice-update.component.html'
})
export class PraticeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected praticeService: PraticeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pratice }) => {
      this.updateForm(pratice);
    });
  }

  updateForm(pratice: IPratice) {
    this.editForm.patchValue({
      id: pratice.id,
      name: pratice.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pratice = this.createFromForm();
    if (pratice.id !== undefined) {
      this.subscribeToSaveResponse(this.praticeService.update(pratice));
    } else {
      this.subscribeToSaveResponse(this.praticeService.create(pratice));
    }
  }

  private createFromForm(): IPratice {
    return {
      ...new Pratice(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPratice>>) {
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
