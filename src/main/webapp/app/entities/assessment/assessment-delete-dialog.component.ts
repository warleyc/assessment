import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from './assessment.service';

@Component({
  selector: 'jhi-assessment-delete-dialog',
  templateUrl: './assessment-delete-dialog.component.html'
})
export class AssessmentDeleteDialogComponent {
  assessment: IAssessment;

  constructor(
    protected assessmentService: AssessmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.assessmentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'assessmentListModification',
        content: 'Deleted an assessment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-assessment-delete-popup',
  template: ''
})
export class AssessmentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assessment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AssessmentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.assessment = assessment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/assessment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/assessment', { outlets: { popup: null } }]);
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
