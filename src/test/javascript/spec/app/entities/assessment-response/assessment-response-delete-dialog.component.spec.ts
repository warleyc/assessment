/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentResponseDeleteDialogComponent } from 'app/entities/assessment-response/assessment-response-delete-dialog.component';
import { AssessmentResponseService } from 'app/entities/assessment-response/assessment-response.service';

describe('Component Tests', () => {
  describe('AssessmentResponse Management Delete Component', () => {
    let comp: AssessmentResponseDeleteDialogComponent;
    let fixture: ComponentFixture<AssessmentResponseDeleteDialogComponent>;
    let service: AssessmentResponseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentResponseDeleteDialogComponent]
      })
        .overrideTemplate(AssessmentResponseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssessmentResponseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentResponseService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
