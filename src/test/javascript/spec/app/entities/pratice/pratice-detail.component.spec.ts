/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AssessmentTestModule } from '../../../test.module';
import { PraticeDetailComponent } from 'app/entities/pratice/pratice-detail.component';
import { Pratice } from 'app/shared/model/pratice.model';

describe('Component Tests', () => {
  describe('Pratice Management Detail Component', () => {
    let comp: PraticeDetailComponent;
    let fixture: ComponentFixture<PraticeDetailComponent>;
    const route = ({ data: of({ pratice: new Pratice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [PraticeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PraticeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PraticeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pratice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
