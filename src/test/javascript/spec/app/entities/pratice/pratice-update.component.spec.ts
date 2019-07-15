/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { PraticeUpdateComponent } from 'app/entities/pratice/pratice-update.component';
import { PraticeService } from 'app/entities/pratice/pratice.service';
import { Pratice } from 'app/shared/model/pratice.model';

describe('Component Tests', () => {
  describe('Pratice Management Update Component', () => {
    let comp: PraticeUpdateComponent;
    let fixture: ComponentFixture<PraticeUpdateComponent>;
    let service: PraticeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [PraticeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PraticeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PraticeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PraticeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pratice(123);
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
        const entity = new Pratice();
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
