import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EventDetailComponent } from './event-detail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {PopupComponent} from "../popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../services/event.service";
import {delay, Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {TicketService} from "../services/ticket.service";

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  //let eventService:EventService;
  let el:DebugElement;
  let storageService:StorageService;

let getEventSpy:jasmine.SpyObj<EventService>;
let getEventSeatSpy:jasmine.SpyObj<EventService>;
let getUserSpy:jasmine.SpyObj<StorageService>;
let postTicketSpy:jasmine.SpyObj<TicketService>;
  const storage = jasmine.createSpyObj('StorageService', ['getUser']);

  const mokeEvent={
    address: "string;",
    date: new Date(),
    id: 5,
    name: "string;",
    tickets_count: 5,
    image:"string;"
  }

  const mokeEventSeat=[1,2,3,4,7]

  const mokeStorage={
    'token': "43tgrg34yhfeyg43",
    'username': "this.form.value.username",
    'role': `elem["role"].slice(5,)`,
    'id': `elem["id"]`
  }

  beforeEach(async () => {
    const mockEventService=jasmine.createSpyObj("EventService",['getEvent','getEventSeat']);
    getEventSpy=mockEventService.getEvent.and.returnValue(of(mokeEvent));
    getEventSeatSpy=mockEventService.getEventSeat.and.returnValue(of(mokeEventSeat));
  const mockStorageService=jasmine.createSpyObj("StorageService",['getUser']);
    getUserSpy=mockStorageService.getUser.and.returnValue(mokeStorage);
    const mockTicketService=jasmine.createSpyObj("TicketService",['buyTicket']);
    postTicketSpy=mockTicketService.buyTicket;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [ EventDetailComponent,
        PopupComponent ],
      providers:[{provide:EventService,useValue: mockEventService},
        {provide:StorageService,useValue:mockStorageService},
        {provide:TicketService,useValue:mockTicketService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click button', fakeAsync(() => {

    component.bookTicket()
    spyOn(component,'bookTicket')
    fixture.detectChanges()
    tick()
    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();
    expect(component.bookTicket).toHaveBeenCalled();

  }));

  it('should call buyTicket',fakeAsync(() => {




    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();
    fixture.detectChanges();

    //component.buyTicket()

    const buyButton = el.query(By.css(".buy-btn")).nativeElement;
    buyButton.click();
    tick()
    expect(postTicketSpy).toHaveBeenCalled();

  }));

  it('should open login popup',fakeAsync(() => {



    getUserSpy.getUser.and.returnValue('');
    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();


    //component.buyTicket()


    tick()
    expect(getUserSpy).toHaveBeenCalled();

  }));
  // it('should call ngOnInit', () => {
  //
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   expect(component.event$).toBe(of(mokeEvent));
  //
  //
  //
  //   // userService.deleteUser(username)
  //   //   .subscribe({
  //   //     next: response => {
  //   //
  //   //
  //   //       expect(response).toBe(mokeResponse);
  //   //
  //   //
  //   //     },
  //   //     error: (err) => {
  //   //       expect(err).toBe('No user found')
  //   //     }
  //   //   });
  //   //
  //   // const req = httpTestingController.expectOne(`/api/v1/user/${username}`);
  //   //
  //   // expect(req.request.method).toEqual("DELETE");
  //   // req.flush(mokeResponse)
  //   // httpTestingController.verify()
  //   // expect(req.request.body.titles.description)
  //   //   .toEqual(changes.titles.description);
  //
  // });
});
