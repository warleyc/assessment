/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentTestModule } from '../../../test.module';
import { PraticeDeleteDialogComponent } from 'app/entities/pratice/pratice-delete-dialog.component';
import { PraticeService } from 'app/entities/pratice/pratice.service';

describe('Component Tests', () => {
  describe('Pratice Management Delete Component', () => {
    let comp: PraticeDeleteDialogComponent;
    let fixture: ComponentFixture<PraticeDeleteDialogComponent>;
    let service: PraticeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [PraticeDeleteDialogComponent]
      })
        .overrideTemplate(PraticeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PraticeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PraticeService);
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
