import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementComponent } from './event-management.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FilterEventPipe} from "../pipe/filter-event.pipe";
import {PopupComponent} from "../popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../services/event.service";
import {EventItem} from "../models/event.model";
import {of} from "rxjs";
import {CreateEventComponent} from "../dialogs/craete-event/create-event.component";

describe('EventManagementComponent', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;
  let eventService: jasmine.SpyObj<EventService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  const mockEvents:EventItem[] = [
    { id: 1, name: 'Event 1', address: 'Address 1', date: new Date(), tickets_count: 10,image:"F" },
    { id: 2, name: 'Event 2', address: 'Address 2', date: new Date(), tickets_count: 20,image:"F" }
  ];
  beforeEach(async () => {
    eventService = jasmine.createSpyObj('EventService', ['getEventsData', 'deleteEvent']);
    dialog= jasmine.createSpyObj('MatDialog', ['open']);
    eventService.getEventsData.and.returnValue(of(mockEvents))
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule
     ],
      providers: [
        { provide: EventService, useValue: eventService },
        { provide: MatDialog, useValue: dialog }
      ],
      declarations: [ EventManagementComponent,
        FilterEventPipe,
      PopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve events on component initialization', () => {

    eventService.getEventsData.and.returnValue(of(mockEvents));

    fixture.detectChanges();

    expect(component.events).toEqual(mockEvents);
    expect(eventService.getEventsData).toHaveBeenCalled();
  });

  it('should open create event dialog and refresh events on dialog close', () => {

    eventService.getEventsData.and.returnValue(of(mockEvents));

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(undefined), close: null });
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(dialog.open).toHaveBeenCalledWith(CreateEventComponent, { data: { state: false } });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(eventService.getEventsData).toHaveBeenCalledTimes(2);
  });

  it('should delete event and refresh events', () => {
    const eventId = '1';
    eventService.deleteEvent.and.returnValue(of(null));
    eventService.getEventsData.and.returnValue(of([]));

    component.deleteEvent(eventId);

    expect(eventService.deleteEvent).toHaveBeenCalledWith(eventId);
    expect(eventService.getEventsData).toHaveBeenCalledTimes(2);
  });

  it('should open edit event dialog and refresh events on dialog close', () => {
    const eventId = '1';

    eventService.getEventsData.and.returnValue(of(mockEvents));

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(undefined), close: null });
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.editEvent(eventId);

    expect(dialog.open).toHaveBeenCalledWith(CreateEventComponent, { data: { state: true, id: eventId } });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(eventService.getEventsData).toHaveBeenCalledTimes(2);
  });
});
