/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AssessmentService } from 'app/entities/assessment/assessment.service';
import { IAssessment, Assessment, STATUS } from 'app/shared/model/assessment.model';

describe('Service Tests', () => {
  describe('Assessment Service', () => {
    let injector: TestBed;
    let service: AssessmentService;
    let httpMock: HttpTestingController;
    let elemDefault: IAssessment;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AssessmentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Assessment(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', STATUS.DRAFT, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            lastModification: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Assessment', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastModification: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            lastModification: currentDate
          },
          returnedFromService
        );
        service
          .create(new Assessment(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Assessment', async () => {
        const returnedFromService = Object.assign(
          {
            applicationName: 'BBBBBB',
            assetOwner: 'BBBBBB',
            techDivisionManager: 'BBBBBB',
            applicationVersion: 'BBBBBB',
            status: 'BBBBBB',
            lastModification: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastModification: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Assessment', async () => {
        const returnedFromService = Object.assign(
          {
            applicationName: 'BBBBBB',
            assetOwner: 'BBBBBB',
            techDivisionManager: 'BBBBBB',
            applicationVersion: 'BBBBBB',
            status: 'BBBBBB',
            lastModification: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            lastModification: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Assessment', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
