import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssessment } from 'app/shared/model/assessment.model';

@Component({
  selector: 'jhi-assessment-detail',
  templateUrl: './assessment-detail.component.html'
})
export class AssessmentDetailComponent implements OnInit {
  assessment: IAssessment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assessment }) => {
      this.assessment = assessment;
    });
  }

  previousState() {
    window.history.back();
  }
}
