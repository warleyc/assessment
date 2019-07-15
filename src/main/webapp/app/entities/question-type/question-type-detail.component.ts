import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionType } from 'app/shared/model/question-type.model';

@Component({
  selector: 'jhi-question-type-detail',
  templateUrl: './question-type-detail.component.html'
})
export class QuestionTypeDetailComponent implements OnInit {
  questionType: IQuestionType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ questionType }) => {
      this.questionType = questionType;
    });
  }

  previousState() {
    window.history.back();
  }
}
