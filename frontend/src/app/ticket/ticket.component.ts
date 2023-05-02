import {Component, OnInit} from '@angular/core';
import {TicketItem} from "../models/ticket.model";
import {TicketService} from "../services/ticket.service";
import {StorageService} from "../services/storage.service";
import {map} from "rxjs";
import {EventService} from "../services/event.service";
import {LoaderService} from "../services/loader.service";



@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit{
  tickets: TicketItem[] = []

  constructor(
    private ticketService: TicketService,
    private storageService: StorageService,
    private eventService: EventService,
    public loadingService:LoaderService,
  ) {
  }
  ngOnInit(): void {
    this.ticketService
      .getTicketsData(this.storageService
                      .getUser().username)
      .pipe(map((tickets) => {
            tickets.map((ticket) => {
            this.eventService.getEvent(ticket.event_id)
                  .subscribe(ticketEvent=>{
                    ticket.name=ticketEvent.name
})})

            return tickets
    }))
      .subscribe(value => this.tickets = value);
  }
}
