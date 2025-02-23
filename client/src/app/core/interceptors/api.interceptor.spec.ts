import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { apiInterceptor } from './api.interceptor';
import { environment } from '../../../environments/environment';

describe('apiInterceptor', () => {
  let httpClient: HttpClient;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpCtrl.verify();
  });

  it('should add the api url if a request sent to api endpoint', (done) => {
    httpClient.get('/api/todo').subscribe({
      next: () => {
        done();
      },
      error: (err) => {
        done.fail(err);
      },
    });

    const req = httpCtrl.expectOne(`${environment.apiUrl}/api/todo`);
    req.flush({});
  });

  it('should not add the api url if a request sent to non api endpoint', (done) => {
    httpClient.get('https://dummyjson.com/products').subscribe({
      next: () => {
        done();
      },
      error: (err) => {
        done.fail(err);
      },
    });

    const req = httpCtrl.expectOne(`https://dummyjson.com/products`);
    req.flush({});
  });
});
