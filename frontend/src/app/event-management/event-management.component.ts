import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserItem} from "../models/user.model";
import {EventItem} from "../models/event.model";
import {EventService} from "../services/event.service";
import {PopupService} from "../services/popup.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateEventComponent} from "../dialogs/craete-event/create-event.component";

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent {
  constructor(private userService: UserService,
              private eventService: EventService,
              public dialog: MatDialog,
  ) { }

  events: EventItem[] = []

  public searchInput = '';
  // @ts-ignore
  public searchResult: Array<any> = [];

  userList:Array<any>  = []

  openDialog(){
    const data={state:false}
    this.dialog.open(CreateEventComponent,{data:data}).afterClosed().subscribe(()=>{
      this.eventService.getEventsData().subscribe(events => this.events=events);
    });

  }
  ngOnInit(): void {
    this.eventService.getEventsData().subscribe(events => this.events=events);
  }
  deleteEvent(id:string){
    this.eventService.deleteEvent(id).subscribe({
      next: ()=>{
        this.eventService.getEventsData().subscribe(events => this.events=events);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  editEvent(id:string){
    const data={state:true,id:id}
    this.dialog.open(CreateEventComponent,{data:data}).afterClosed().subscribe(()=>{
      this.eventService.getEventsData().subscribe(events => this.events=events);
    });
  }
}
