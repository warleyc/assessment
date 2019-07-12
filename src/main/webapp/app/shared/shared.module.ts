import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AssessmentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [AssessmentSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [AssessmentSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentSharedModule {
  static forRoot() {
    return {
      ngModule: AssessmentSharedModule
    };
  }
}
