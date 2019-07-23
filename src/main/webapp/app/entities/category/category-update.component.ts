import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICategory, Category } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { IPratice } from 'app/shared/model/pratice.model';
import { PraticeService } from 'app/entities/pratice';

@Component({
  selector: 'jhi-category-update',
  templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
  isSaving: boolean;

  pratices: IPratice[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    pratice: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected categoryService: CategoryService,
    protected praticeService: PraticeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
    });
    this.praticeService
      .query({ filter: 'category-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPratice[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPratice[]>) => response.body)
      )
      .subscribe(
        (res: IPratice[]) => {
          if (!this.editForm.get('pratice').value || !this.editForm.get('pratice').value.id) {
            this.pratices = res;
          } else {
            this.praticeService
              .find(this.editForm.get('pratice').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPratice>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPratice>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPratice) => (this.pratices = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(category: ICategory) {
    this.editForm.patchValue({
      id: category.id,
      name: category.name,
      pratice: category.pratice
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }

  private createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      pratice: this.editForm.get(['pratice']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
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

  trackPraticeById(index: number, item: IPratice) {
    return item.id;
  }
}
