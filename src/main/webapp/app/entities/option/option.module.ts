import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessmentSharedModule } from 'app/shared';
import {
  OptionComponent,
  OptionDetailComponent,
  OptionUpdateComponent,
  OptionDeletePopupComponent,
  OptionDeleteDialogComponent,
  optionRoute,
  optionPopupRoute
} from './';

const ENTITY_STATES = [...optionRoute, ...optionPopupRoute];

@NgModule({
  imports: [AssessmentSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [OptionComponent, OptionDetailComponent, OptionUpdateComponent, OptionDeleteDialogComponent, OptionDeletePopupComponent],
  entryComponents: [OptionComponent, OptionUpdateComponent, OptionDeleteDialogComponent, OptionDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentOptionModule {}
