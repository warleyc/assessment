/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { AssessmentDetailComponent } from 'app/entities/assessment/assessment-detail.component';
import { Assessment } from 'app/shared/model/assessment.model';

describe('Component Tests', () => {
  describe('Assessment Management Detail Component', () => {
    let comp: AssessmentDetailComponent;
    let fixture: ComponentFixture<AssessmentDetailComponent>;
    const route = ({ data: of({ assessment: new Assessment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [AssessmentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AssessmentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssessmentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.assessment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
