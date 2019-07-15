/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { QuestionTypeUpdateComponent } from 'app/entities/question-type/question-type-update.component';
import { QuestionTypeService } from 'app/entities/question-type/question-type.service';
import { QuestionType } from 'app/shared/model/question-type.model';

describe('Component Tests', () => {
  describe('QuestionType Management Update Component', () => {
    let comp: QuestionTypeUpdateComponent;
    let fixture: ComponentFixture<QuestionTypeUpdateComponent>;
    let service: QuestionTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [QuestionTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QuestionTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
