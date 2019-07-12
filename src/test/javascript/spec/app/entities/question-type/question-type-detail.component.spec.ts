/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { QuestionTypeDetailComponent } from 'app/entities/question-type/question-type-detail.component';
import { QuestionType } from 'app/shared/model/question-type.model';

describe('Component Tests', () => {
  describe('QuestionType Management Detail Component', () => {
    let comp: QuestionTypeDetailComponent;
    let fixture: ComponentFixture<QuestionTypeDetailComponent>;
    const route = ({ data: of({ questionType: new QuestionType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [QuestionTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuestionTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.questionType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
