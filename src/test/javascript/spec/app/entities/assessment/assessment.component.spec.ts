/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentComponent } from 'app/entities/assessment/assessment.component';
import { AssessmentService } from 'app/entities/assessment/assessment.service';
import { Assessment } from 'app/shared/model/assessment.model';

describe('Component Tests', () => {
  describe('Assessment Management Component', () => {
    let comp: AssessmentComponent;
    let fixture: ComponentFixture<AssessmentComponent>;
    let service: AssessmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentComponent],
        providers: []
      })
        .overrideTemplate(AssessmentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssessmentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Assessment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.assessments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
