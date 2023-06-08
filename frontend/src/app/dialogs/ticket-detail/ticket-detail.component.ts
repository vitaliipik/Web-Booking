import {Component, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['../craete-event/create-event.component.scss']
})
export class TicketDetailComponent {

  public Id=""
  constructor(private dialogRef: MatDialogRef<TicketDetailComponent>,
              private ticketService: TicketService,
              @Inject(MAT_DIALOG_DATA) public data:{id:string}) {
    dialogRef.disableClose = true;
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    })
    this.Id=data.id
  }
  onSubmit(): void {

    this.ticketService.cancelTicket(this.Id).subscribe({

          next: () => {
            this.dialogRef.close();
          },
          error: (err) => {
            if (typeof err.error === 'object' && err.error !== null) {
              alert(err.error.message)
            } else {
              alert(err.error);
            }
          }
        })



  }
}
