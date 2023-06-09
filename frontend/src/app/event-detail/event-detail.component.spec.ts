import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EventDetailComponent} from './event-detail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PopupComponent} from "../popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../services/event.service";
import {Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {TicketService} from "../services/ticket.service";

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  //let eventService:EventService;
  let el: DebugElement;


  let mockTicketService:jasmine.SpyObj<TicketService>;
  let mockEventService: jasmine.SpyObj<EventService>;

  let mockStorageService: jasmine.SpyObj<StorageService>;

  const mokeEvent = {
    address: "string;",
    date: new Date(),
    id: 5,
    name: "string;",
    tickets_count: 5,
    image: "string;"
  }

  const mokeEventSeat = [1, 2, 3, 4, 7]

  const mokeStorage = {
    'token': "43tgrg34yhfeyg43",
    'username': "this.form.value.username",
    'role': `elem["role"].slice(5,)`,
    'id': `elem["id"]`
  }

  beforeEach(async () => {
    const mockEventService = jasmine.createSpyObj("EventService", ['getEvent', 'getEventSeat']);
    mockEventService.getEvent.and.returnValue(of(mokeEvent));
    mockEventService.getEventSeat.and.returnValue(of(mokeEventSeat));
    mockStorageService = jasmine.createSpyObj("StorageService", ['getUser']);
    mockStorageService.getUser.and.returnValue(mokeStorage);
    mockTicketService = jasmine.createSpyObj("TicketService", ['buyTicket']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [EventDetailComponent,
        PopupComponent],
      providers: [{provide: EventService, useValue: mockEventService},
        {provide: StorageService, useValue: mockStorageService},
        {provide: TicketService, useValue: mockTicketService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click button', fakeAsync(() => {

    component.bookTicket()
    spyOn(component, 'bookTicket')
    fixture.detectChanges()
    tick()
    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();
    expect(component.bookTicket).toHaveBeenCalled();

  }));

  it('should call buyTicket', fakeAsync(() => {


    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();
    fixture.detectChanges();

    //component.buyTicket()

    const buyButton = el.query(By.css(".buy-btn")).nativeElement;
    buyButton.click();
    tick()
    expect(mockTicketService.buyTicket).toHaveBeenCalled();

  }));


  it('should open login popup', fakeAsync(() => {


    const getUserSpy= mockStorageService.getUser.and.returnValue('');
    const button = el.query(By.css(".event-buy-button")).nativeElement;
    button.click();


    //component.buyTicket()


    tick()
    expect(getUserSpy).toHaveBeenCalled();

  }));
  it('should open "Not Logged In" popup when "Buy" button is clicked and user is not logged in', () => {

    mockStorageService.getUser.and.returnValue({});


    const buyButton = fixture.debugElement.query(By.css('.event-buy-button'));
    buyButton.nativeElement.click();

    fixture.detectChanges()
    const notLoggedInPopup = fixture.debugElement.query(By.css('#modal-1')).nativeElement.style.display;
    const LoggedInPopup  = fixture.debugElement.query(By.css('#modal-2')).nativeElement.style.display;
    expect(notLoggedInPopup).toBe('block');
    expect(LoggedInPopup).toBe('none');
  });

  it('should display error message when buyTicket() function throws an error', () => {
    mockStorageService.getUser.and.returnValue({ loggedIn: true });
    const res ={error: {status:400 ,message: 'Image upload failed'}};
    const errorResponse = new Observable((stat)=>{stat.error(res)}
    );
    spyOn(window,'alert')
   mockTicketService.buyTicket.and.returnValue(errorResponse);
    const popupButton = fixture.nativeElement.querySelector('.event-buy-button');
    popupButton.click();
    const buyButton = fixture.debugElement.query(By.css('.buy-btn'));
    buyButton.nativeElement.click();
    fixture.detectChanges();


    expect(window.alert).toHaveBeenCalledWith(res.error.message);
  });

  it('should call goToLogin() function when "Login" button is clicked in the error message', () => {
    mockStorageService.getUser.and.returnValue({});
    mockTicketService.buyTicket.and.throwError('Error occurred');
    spyOn(component['router'], 'navigateByUrl');

    const buyButton = fixture.nativeElement.querySelector('.event-buy-button');
    buyButton.click();
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('.go-to-login'));
    loginButton.nativeElement.click();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/login')
  });

});
