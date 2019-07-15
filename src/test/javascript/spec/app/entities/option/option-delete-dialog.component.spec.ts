/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentTestModule } from '../../../test.module';
import { OptionDeleteDialogComponent } from 'app/entities/option/option-delete-dialog.component';
import { OptionService } from 'app/entities/option/option.service';

describe('Component Tests', () => {
  describe('Option Management Delete Component', () => {
    let comp: OptionDeleteDialogComponent;
    let fixture: ComponentFixture<OptionDeleteDialogComponent>;
    let service: OptionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [OptionDeleteDialogComponent]
      })
        .overrideTemplate(OptionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OptionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OptionService);
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
