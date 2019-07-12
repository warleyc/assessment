import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestionType } from 'app/shared/model/question-type.model';
import { QuestionTypeService } from './question-type.service';

@Component({
  selector: 'jhi-question-type-delete-dialog',
  templateUrl: './question-type-delete-dialog.component.html'
})
export class QuestionTypeDeleteDialogComponent {
  questionType: IQuestionType;

  constructor(
    protected questionTypeService: QuestionTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.questionTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'questionTypeListModification',
        content: 'Deleted an questionType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-question-type-delete-popup',
  template: ''
})
export class QuestionTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ questionType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(QuestionTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.questionType = questionType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/question-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/question-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
