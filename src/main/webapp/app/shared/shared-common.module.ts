import { NgModule } from '@angular/core';

import { AssessmentSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [AssessmentSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [AssessmentSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AssessmentSharedCommonModule {}
