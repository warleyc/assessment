import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOption } from 'app/shared/model/option.model';

@Component({
  selector: 'jhi-option-detail',
  templateUrl: './option-detail.component.html'
})
export class OptionDetailComponent implements OnInit {
  option: IOption;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ option }) => {
      this.option = option;
    });
  }

  previousState() {
    window.history.back();
  }
}
