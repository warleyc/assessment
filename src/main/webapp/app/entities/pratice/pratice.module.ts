import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessmentSharedModule } from 'app/shared';
import {
  PraticeComponent,
  PraticeDetailComponent,
  PraticeUpdateComponent,
  PraticeDeletePopupComponent,
  PraticeDeleteDialogComponent,
  praticeRoute,
  praticePopupRoute
} from './';

const ENTITY_STATES = [...praticeRoute, ...praticePopupRoute];

@NgModule({
  imports: [AssessmentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PraticeComponent,
    PraticeDetailComponent,
    PraticeUpdateComponent,
    PraticeDeleteDialogComponent,
    PraticeDeletePopupComponent
  ],
  entryComponents: [PraticeComponent, PraticeUpdateComponent, PraticeDeleteDialogComponent, PraticeDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentPraticeModule {}
