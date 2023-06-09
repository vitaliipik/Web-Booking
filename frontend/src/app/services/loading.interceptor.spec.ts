import { TestBed } from '@angular/core/testing';

import { LoadingInterceptor } from './loading.interceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LoaderService} from "./loader.service";

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: LoadingInterceptor
  let loaderService: LoaderService;
  let httpClient: HttpClient;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    providers: [
      LoadingInterceptor,
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
      ]
  })
    interceptor = TestBed.inject(LoadingInterceptor);
    loaderService = TestBed.inject(LoaderService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('should increment the totalRequests counter', () => {
    // Arrange
    const request = new HttpRequest('GET', 'https://example.com');
    const handler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        // No-op
        return new Observable<HttpEvent<any>>();
      },
    };

    // Act
    interceptor.intercept(request, handler);

    // Assert
    expect(interceptor['totalRequests']).toBe(1);
  });
  it('should set loading state to true when intercepting a request', () => {
    httpClient.get('/api/data').subscribe();

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    expect(loaderService.loading).toBe(true);

    req.flush({});

    expect(loaderService.loading).toBe(false);
  });

  it('should set loading state to false when all requests are completed', () => {
    httpClient.get('/api/data').subscribe();
    httpClient.get('/api/other').subscribe();

    const req1 = httpMock.expectOne('/api/data');
    const req2 = httpMock.expectOne('/api/other');

    req1.flush({});
    req2.flush({});

    expect(loaderService.loading).toBe(false);
  });

  it('should keep loading state true when multiple requests are intercepted', () => {
    httpClient.get('/api/data').subscribe();
    httpClient.post('/api/other', {}).subscribe();

    const req1 = httpMock.expectOne('/api/data');
    const req2 = httpMock.expectOne('/api/other');

    expect(loaderService.loading).toBe(true);

    req1.flush({});
    expect(loaderService.loading).toBe(true);

    req2.flush({});
    expect(loaderService.loading).toBe(false);
  });

  it('should set loading state to false after the last request completes', () => {
    httpClient.get('/api/data').subscribe();
    httpClient.get('/api/other').subscribe();

    const req1 = httpMock.expectOne('/api/data');
    const req2 = httpMock.expectOne('/api/other');

    expect(loaderService.loading).toBe(true);

    req1.flush({});
    expect(loaderService.loading).toBe(true);

    req2.flush({});

    expect(loaderService.loading).toBe(false);
  });


});
