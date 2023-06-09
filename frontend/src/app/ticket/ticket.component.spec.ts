import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketComponent } from './ticket.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {TicketService} from "../services/ticket.service";
import {of} from "rxjs";
import {TicketItem} from "../models/ticket.model";
import {MatDialogModule} from "@angular/material/dialog";

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let el: DebugElement;
  let mockedTicketService: jasmine.SpyObj<TicketService>;
  const tickets= [{
    address: "string;",
    id: 1,
    date: new Date(),
    name: "string;",
    event_id: 1,
    status: "book",
    tickets_count: 5,
    seat: "5",
  }, {
    address: "string;",
    id: 1,
    date: new Date(),
    name: "string;",
    event_id: 1,
    status: "book",
    tickets_count: 5,
    seat: "5",

  }];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoaderService', ['loading'],['loading']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      MatDialogModule],
      declarations: [ TicketComponent ],
      providers:[{provide:LoaderService,useValue:spy},
        {provide:LoaderService,useValue:spy}]
    })
    .compileComponents();
    mockedTicketService = jasmine.createSpyObj('TicketService', ['getTicketsData'])
    mockedTicketService.getTicketsData.and.returnValue(of(tickets))
    loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tickets', () => {
    component.tickets=tickets
    fixture.detectChanges()

    const ticketsElem=el.queryAll(By.css('.ticket'));

    expect(ticketsElem.length).toBe(2)
    const ticketElement=ticketsElem[0];
    const ticketEvent= ticketElement.query(By.css('.ticket-event')).nativeElement;
    expect(ticketEvent.innerHTML).toContain(tickets[0].name)
    const ticketStatus= ticketElement.query(By.css('.ticket-status')).nativeElement;
    expect(ticketStatus.innerHTML).toContain(tickets[0].status)
    const ticketSeat= ticketElement.query(By.css('.ticket-seat')).nativeElement;
    expect(ticketSeat.innerHTML).toContain(tickets[0].seat)
  });

  // it('should display ticket dont exist if loading is stop', () => {
  //   loaderServiceSpy.loading=false
  // l
  //   const infoModal= el.queryAll(By.css(".modal-container"))
  //   expect(infoModal).toBeTruthy()
  //   loaderServiceSpy.loading=true
  //
  //   expect(infoModal).toBeFalsy()
  // });
});
