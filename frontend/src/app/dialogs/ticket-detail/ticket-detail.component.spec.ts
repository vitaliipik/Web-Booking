import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailComponent } from './ticket-detail.component';
import {TicketService} from "../../services/ticket.service";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Observable, of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let dialogRef: MatDialogRef<TicketDetailComponent>;
  let ticketService: jasmine.SpyObj<TicketService>;

  beforeEach(async () => {

    const dialogMock = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);
    dialogMock.backdropClick.and.returnValue(of(true))

    const ticketServiceMock = jasmine.createSpyObj('TicketService', ['cancelTicket']);

    await TestBed.configureTestingModule({
      declarations: [TicketDetailComponent],
      imports:[MatDialogModule,
        RouterTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: { id: 'test-id' } },
        { provide: TicketService, useValue: ticketServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    ticketService = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call cancelTicket method on "Refuse" button click', () => {
    ticketService.cancelTicket.and.returnValue(of(null));

    const cancelButton = fixture.nativeElement.querySelector('.btn-primary');
    cancelButton.click();

    expect(ticketService.cancelTicket).toHaveBeenCalledWith('test-id');
  });

  it('should close dialog after successful cancellation', () => {
    ticketService.cancelTicket.and.returnValue(of(null));

    const cancelButton = fixture.nativeElement.querySelector('.btn-primary');
    cancelButton.click();

    expect(component["dialogRef"].close).toHaveBeenCalled();
  });

  it('should display alert on cancellation error', () => {
    spyOn(window, 'alert');
    const errorMessage = 'Cancellation failed';
    ticketService.cancelTicket.and.returnValue(throwError(
      { error: { message: errorMessage } })
    );

    const cancelButton = fixture.nativeElement.querySelector('.btn-primary');
    cancelButton.click();

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

  it('should dismiss dialog on "Dismiss" button click', () => {
    const dismissButton = fixture.nativeElement.querySelector('[matDialogClose]');
    dismissButton.click();

    expect(component["dialogRef"].close).toHaveBeenCalled();
  });
});
