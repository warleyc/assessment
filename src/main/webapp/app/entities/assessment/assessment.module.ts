import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessmentSharedModule } from 'app/shared';
import {
  AssessmentComponent,
  AssessmentDetailComponent,
  AssessmentUpdateComponent,
  AssessmentDeletePopupComponent,
  AssessmentDeleteDialogComponent,
  assessmentRoute,
  assessmentPopupRoute
} from './';

const ENTITY_STATES = [...assessmentRoute, ...assessmentPopupRoute];

@NgModule({
  imports: [AssessmentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AssessmentComponent,
    AssessmentDetailComponent,
    AssessmentUpdateComponent,
    AssessmentDeleteDialogComponent,
    AssessmentDeletePopupComponent
  ],
  entryComponents: [AssessmentComponent, AssessmentUpdateComponent, AssessmentDeleteDialogComponent, AssessmentDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentAssessmentModule {}
