import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PaginationComponent} from "../pagination/pagination.component";
import {DebugElement} from "@angular/core";
import {EventService} from "../services/event.service";
import {EventItem} from "../models/event.model";

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
let el:DebugElement;
let eventService:EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [ EventListComponent,
        PaginationComponent ],
      providers:[{provide:EventService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    eventService=jasmine.createSpyObj('EventService',['getEventsData'])
    component = fixture.componentInstance;
    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the event list', () => {
    const events=[{
      address: "string;",
      date: "Date;",
      id: 1,
      name: "string;",
      tickets_count: 4,
      image:"name"
    },{
      address: "string;",
      date: "Date;",
      id: 2,
      name: "string;",
      tickets_count: 4,
      image:"name"
    }]
    component.events=
  });


});
