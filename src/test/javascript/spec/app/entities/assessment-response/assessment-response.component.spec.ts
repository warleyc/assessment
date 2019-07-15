/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentResponseComponent } from 'app/entities/assessment-response/assessment-response.component';
import { AssessmentResponseService } from 'app/entities/assessment-response/assessment-response.service';
import { AssessmentResponse } from 'app/shared/model/assessment-response.model';

describe('Component Tests', () => {
  describe('AssessmentResponse Management Component', () => {
    let comp: AssessmentResponseComponent;
    let fixture: ComponentFixture<AssessmentResponseComponent>;
    let service: AssessmentResponseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentResponseComponent],
        providers: []
      })
        .overrideTemplate(AssessmentResponseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AssessmentResponseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AssessmentResponseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AssessmentResponse(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.assessmentResponses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
