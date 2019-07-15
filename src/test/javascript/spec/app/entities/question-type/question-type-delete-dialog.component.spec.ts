/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentTestModule } from '../../../test.module';
import { QuestionTypeDeleteDialogComponent } from 'app/entities/question-type/question-type-delete-dialog.component';
import { QuestionTypeService } from 'app/entities/question-type/question-type.service';

describe('Component Tests', () => {
  describe('QuestionType Management Delete Component', () => {
    let comp: QuestionTypeDeleteDialogComponent;
    let fixture: ComponentFixture<QuestionTypeDeleteDialogComponent>;
    let service: QuestionTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [QuestionTypeDeleteDialogComponent]
      })
        .overrideTemplate(QuestionTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionTypeService);
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
