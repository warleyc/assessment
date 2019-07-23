import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'assessment',
        loadChildren: './assessment/assessment.module#AssessmentAssessmentModule'
      },
      {
        path: 'question',
        loadChildren: './question/question.module#AssessmentQuestionModule'
      },
      {
        path: 'question-type',
        loadChildren: './question-type/question-type.module#AssessmentQuestionTypeModule'
      },
      {
        path: 'assessment-response',
        loadChildren: './assessment-response/assessment-response.module#AssessmentAssessmentResponseModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#AssessmentCategoryModule'
      },
      {
        path: 'pratice',
        loadChildren: './pratice/pratice.module#AssessmentPraticeModule'
      },
      {
        path: 'option',
        loadChildren: './option/option.module#AssessmentOptionModule'
      },
      {
        path: 'annotation',
        loadChildren: './annotation/annotation.module#AssessmentAnnotationModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessmentEntityModule {}
