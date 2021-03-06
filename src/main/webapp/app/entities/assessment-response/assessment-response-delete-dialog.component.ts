import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';
import { AssessmentResponseService } from './assessment-response.service';

@Component({
  selector: 'jhi-assessment-response-delete-dialog',
  templateUrl: './assessment-response-delete-dialog.component.html'
})
export class AssessmentResponseDeleteDialogComponent {
  assessmentResponse: IAssessmentResponse;

  constructor(
    protected assessmentResponseService: AssessmentResponseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.assessmentResponseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'assessmentResponseListModification',
        content: 'Deleted an assessmentResponse'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-assessment-response-delete-popup',
  template: ''
})
export class AssessmentResponseDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assessmentResponse }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AssessmentResponseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.assessmentResponse = assessmentResponse;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/assessment-response', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/assessment-response', { outlets: { popup: null } }]);
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
