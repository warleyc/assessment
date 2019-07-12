import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessmentSharedModule } from 'app/shared';
import {
  AssessmentResponseComponent,
  AssessmentResponseDetailComponent,
  AssessmentResponseUpdateComponent,
  AssessmentResponseDeletePopupComponent,
  AssessmentResponseDeleteDialogComponent,
  assessmentResponseRoute,
  assessmentResponsePopupRoute
} from './';

const ENTITY_STATES = [...assessmentResponseRoute, ...assessmentResponsePopupRoute];

@NgModule({
  imports: [AssessmentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AssessmentResponseComponent,
    AssessmentResponseDetailComponent,
    AssessmentResponseUpdateComponent,
    AssessmentResponseDeleteDialogComponent,
    AssessmentResponseDeletePopupComponent
  ],
  entryComponents: [
    AssessmentResponseComponent,
    AssessmentResponseUpdateComponent,
    AssessmentResponseDeleteDialogComponent,
    AssessmentResponseDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentAssessmentResponseModule {}
