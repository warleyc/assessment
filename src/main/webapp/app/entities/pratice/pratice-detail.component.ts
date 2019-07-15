import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPratice } from 'app/shared/model/pratice.model';

@Component({
  selector: 'jhi-pratice-detail',
  templateUrl: './pratice-detail.component.html'
})
export class PraticeDetailComponent implements OnInit {
  pratice: IPratice;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pratice }) => {
      this.pratice = pratice;
    });
  }

  previousState() {
    window.history.back();
  }
}
