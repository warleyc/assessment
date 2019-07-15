/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessmentTestModule } from '../../../test.module';
import { QuestionTypeComponent } from 'app/entities/question-type/question-type.component';
import { QuestionTypeService } from 'app/entities/question-type/question-type.service';
import { QuestionType } from 'app/shared/model/question-type.model';

describe('Component Tests', () => {
  describe('QuestionType Management Component', () => {
    let comp: QuestionTypeComponent;
    let fixture: ComponentFixture<QuestionTypeComponent>;
    let service: QuestionTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [QuestionTypeComponent],
        providers: []
      })
        .overrideTemplate(QuestionTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new QuestionType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.questionTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
