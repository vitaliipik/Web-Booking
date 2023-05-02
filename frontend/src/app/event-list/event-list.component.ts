import {Component, OnInit} from '@angular/core';
import {EventService} from "../services/event.service";
import {EventItem} from "../models/event.model";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit{
  events: EventItem[] = []
  rando=Math.floor(Math.random() * (800 - 785) + 790)
  constructor(
    private eventService: EventService,
  ) {
  }
  ngOnInit(): void {
    this.eventService.getEventsData().subscribe(events => this.events=events);
  }
  findImage(filename:string){
   return "http://127.0.0.1:5000/display/"+filename
  }
}
