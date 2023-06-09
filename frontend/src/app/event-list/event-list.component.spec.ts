import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PaginationComponent} from "../pagination/pagination.component";
import {DebugElement} from "@angular/core";
import {EventService} from "../services/event.service";
import {EventItem} from "../models/event.model";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {UserItem} from "../models/user.model";
import {of} from "rxjs";
import { DatePipe } from '@angular/common';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let el: DebugElement;
  let mockedEventService: jasmine.SpyObj<EventService>;
  let datePipe:DatePipe;

  const events = [{
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
  beforeEach(async () => {

    mockedEventService = jasmine.createSpyObj('EventService', ['getEventsData'])
    mockedEventService.getEventsData.and.returnValue(of(events))
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],

      declarations: [EventListComponent,
        PaginationComponent],
      providers: [{provide: EventService, useValue: mockedEventService},DatePipe]
    })
      .compileComponents();
    datePipe = TestBed.inject(DatePipe)
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the event list', () => {
    fixture.detectChanges()
    const events = el.queryAll(By.css(".event-details"))
    expect(events.length).toBe(3, "Unexpected number of event")
  });


  it("should fetch events on OnInnit", fakeAsync(() => {
    const response: EventItem[] = [];


    mockedEventService.getEventsData.and.returnValue(of(response));



    component.ngOnInit()
    fixture.detectChanges();


    expect(component.events).toEqual(response);
    expect(mockedEventService.getEventsData).toHaveBeenCalled();

  }));

  it('should return the image URL', () => {
    const filename = 'image.jpg';
    const expectedUrl = 'http://127.0.0.1:5000/display/image.jpg';

    const imageUrl = component.findImage(filename);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('should render events correctly', () => {



    const eventElements = fixture.nativeElement.querySelectorAll('.event-details');


    eventElements.forEach((eventElement:any, index:number) => {
      const event = events[index];

      const eventNameElement = eventElement.querySelector('.event-name');
      const eventAddressElement = eventElement.querySelector('.event-info-value');
      const eventValuesElement = eventElement.querySelectorAll('.event-info-item')[1]
      const eventDateElement = eventValuesElement.querySelector('.event-info-value')


      expect(eventNameElement.textContent).toContain(event.name);
      expect(eventAddressElement.textContent).toContain(event.address);
      expect(eventDateElement.textContent).toContain(datePipe.transform(event.date,'MM/dd/yy'));
    });
  });

});
