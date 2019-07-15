import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPratice } from 'app/shared/model/pratice.model';
import { PraticeService } from './pratice.service';

@Component({
  selector: 'jhi-pratice-delete-dialog',
  templateUrl: './pratice-delete-dialog.component.html'
})
export class PraticeDeleteDialogComponent {
  pratice: IPratice;

  constructor(protected praticeService: PraticeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.praticeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'praticeListModification',
        content: 'Deleted an pratice'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pratice-delete-popup',
  template: ''
})
export class PraticeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pratice }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PraticeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pratice = pratice;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pratice', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pratice', { outlets: { popup: null } }]);
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
