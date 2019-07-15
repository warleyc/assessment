/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentResponseDetailComponent } from 'app/entities/assessment-response/assessment-response-detail.component';
import { AssessmentResponse } from 'app/shared/model/assessment-response.model';

describe('Component Tests', () => {
  describe('AssessmentResponse Management Detail Component', () => {
    let comp: AssessmentResponseDetailComponent;
    let fixture: ComponentFixture<AssessmentResponseDetailComponent>;
    const route = ({ data: of({ assessmentResponse: new AssessmentResponse(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentResponseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AssessmentResponseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssessmentResponseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.assessmentResponse).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
