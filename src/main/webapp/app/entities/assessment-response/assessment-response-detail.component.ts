import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssessmentResponse } from 'app/shared/model/assessment-response.model';

@Component({
  selector: 'jhi-assessment-response-detail',
  templateUrl: './assessment-response-detail.component.html'
})
export class AssessmentResponseDetailComponent implements OnInit {
  assessmentResponse: IAssessmentResponse;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assessmentResponse }) => {
      this.assessmentResponse = assessmentResponse;
    });
  }

  previousState() {
    window.history.back();
  }
}
