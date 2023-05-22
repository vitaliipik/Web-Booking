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

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
let el:DebugElement;
let eventService:EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],

      declarations: [ EventListComponent,
        PaginationComponent ],
      providers:[{provide:EventService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    eventService=TestBed.inject(EventService);
    component = fixture.componentInstance;
    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the event list', () => {
    component.events=[{
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
    }]
    fixture.detectChanges()
    const events = el.queryAll(By.css(".event-details"))
    expect(events.length).toBe(2,"Unexpected number of event")
  });


  it("should call OnInnit and return list of users", fakeAsync(() => {
    const response: EventItem[] = [];

    spyOn(eventService,'getEventsData').and.returnValue(of(response))

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.events).toEqual(response);

  }));




});
