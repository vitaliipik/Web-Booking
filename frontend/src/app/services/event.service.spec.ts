import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });


  const mockEvents = [{
    address: "string;",
    id: 1,
    date: new Date(),
    name: "string;",
    tickets_count: 4,
    image: "name"
  }, {
    address: "string;",
    date: new Date(),
    id: 2,
    name: "string;",
    tickets_count: 4,
    image: "name"
  }, {
    id: 3,
    name: 'Event 3',
    date: new Date(),
    address: 'Address 3',
    tickets_count: 8,
    image: 'image3.jpg'
  }]

  const mockEventItem = {
    address: "string;",
    id: 1,
    date: new Date(),
    name: "string;",
    tickets_count: 4,
    image: "name"
  };
  const mockEventId = 1;

  const mockEventSeats = [1, 2, 3, 4];
  const mockImageFile = new File(['image content'], 'test.png');
  const mockImageFilename = 'test.png';


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve events data from the API', () => {
    service.getEventsData().subscribe(events => {
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne('/api/v1/event');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('should retrieve a specific event from the API', () => {
    service.getEvent(mockEventId).subscribe(event => {
      expect(event).toEqual(mockEventItem);
    });

    const req = httpMock.expectOne(`/api/v1/event/${mockEventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEventItem);
  });

  it('should retrieve event seats from the API', () => {
    service.getEventSeat(mockEventId).subscribe(seats => {
      expect(seats).toEqual(mockEventSeats);
    });

    const req = httpMock.expectOne(`/api/v1/event/seat/${mockEventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEventSeats);
  });

  it('should create a new event', () => {
    service.postEvent(mockEventItem).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/v1/event');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockEventItem);
    req.flush({});
  });

  it('should delete an event', () => {
    service.deleteEvent(mockEventId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/v1/event/${mockEventId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });


  it('should upload an image file', () => {
    const formData = new FormData();
    formData.append('file', mockImageFile);

    service.uploadImage(mockImageFile).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/v1/upload/file');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockImageFile);
    req.flush({});
  });

  it('should retrieve an image from the API', () => {
    service.getImage(mockImageFilename).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`display/${mockImageFilename}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
  it('should retrieve events data from the API', () => {


    service.getEventsData().subscribe(events => {
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne('/api/v1/event');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });
});
