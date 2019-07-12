/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessmentTestModule } from '../../../test.module';
import { PraticeComponent } from 'app/entities/pratice/pratice.component';
import { PraticeService } from 'app/entities/pratice/pratice.service';
import { Pratice } from 'app/shared/model/pratice.model';

describe('Component Tests', () => {
  describe('Pratice Management Component', () => {
    let comp: PraticeComponent;
    let fixture: ComponentFixture<PraticeComponent>;
    let service: PraticeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AssessmentTestModule],
        declarations: [PraticeComponent],
        providers: []
      })
        .overrideTemplate(PraticeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PraticeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PraticeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pratice(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pratices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
