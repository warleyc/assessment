/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentDeleteDialogComponent } from 'app/entities/assessment/assessment-delete-dialog.component';
import { AssessmentService } from 'app/entities/assessment/assessment.service';

describe('Component Tests', () => {
  describe('Assessment Management Delete Component', () => {
    let comp: AssessmentDeleteDialogComponent;
    let fixture: ComponentFixture<AssessmentDeleteDialogComponent>;
    let service: AssessmentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentDeleteDialogComponent]
      })
        .overrideTemplate(AssessmentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssessmentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentService);
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
