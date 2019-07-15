/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentUpdateComponent } from 'app/entities/assessment/assessment-update.component';
import { AssessmentService } from 'app/entities/assessment/assessment.service';
import { Assessment } from 'app/shared/model/assessment.model';

describe('Component Tests', () => {
  describe('Assessment Management Update Component', () => {
    let comp: AssessmentUpdateComponent;
    let fixture: ComponentFixture<AssessmentUpdateComponent>;
    let service: AssessmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AssessmentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssessmentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Assessment(123);
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
        const entity = new Assessment();
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
