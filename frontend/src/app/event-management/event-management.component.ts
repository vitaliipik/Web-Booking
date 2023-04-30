import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserItem} from "../models/user.model";
import {EventItem} from "../models/event.model";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent {
  constructor(private userService: UserService,
              private eventService: EventService) { }

  events: EventItem[] = []

  public searchInput = '';
  // @ts-ignore
  public searchResult: Array<any> = [];

  userList:Array<any>  = []
  ngOnInit(): void {
    this.eventService.getEventsData().subscribe(events => this.events=events);
  }



  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe({
      next: ()=>{
        this.userService.getUsersData().subscribe(users => this.userList=users);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
