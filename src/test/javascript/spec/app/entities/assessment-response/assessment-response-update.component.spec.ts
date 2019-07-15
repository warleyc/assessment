/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentResponseUpdateComponent } from 'app/entities/assessment-response/assessment-response-update.component';
import { AssessmentResponseService } from 'app/entities/assessment-response/assessment-response.service';
import { AssessmentResponse } from 'app/shared/model/assessment-response.model';

describe('Component Tests', () => {
  describe('AssessmentResponse Management Update Component', () => {
    let comp: AssessmentResponseUpdateComponent;
    let fixture: ComponentFixture<AssessmentResponseUpdateComponent>;
    let service: AssessmentResponseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentResponseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AssessmentResponseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssessmentResponseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentResponseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AssessmentResponse(123);
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
        const entity = new AssessmentResponse();
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
