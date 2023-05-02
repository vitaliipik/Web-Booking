import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../services/event.service";
import {Observable, of, take, tap} from "rxjs";
import {EventItem} from "../models/event.model";
import {PopupService} from "../services/popup.service";
import {StorageService} from "../services/storage.service";
import {TicketService} from "../services/ticket.service";


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit{
  constructor(private route:ActivatedRoute,
              private eventService:EventService,
              protected popupService:PopupService,
              private router:Router,
              private storageService:StorageService,
              private ticketService:TicketService) {

  }

  routeId=this.route.snapshot.paramMap.get('id');

  event$:Observable<EventItem> | undefined;
  eventSeat!:number[];
  optionsSeat: Array<string>=[];
  selectedSeat="";
  selectedAction="";

  ngOnInit(): void {
    this.event$=this.eventService.getEvent(this.routeId).pipe(take(1));


  }


  buyTicket(){
    const id = this.storageService.getUser().id

    this.ticketService.buyTicket({
      "seat":this.selectedSeat,
      "status":this.selectedAction,
      // @ts-ignore
      "event_id":this.routeId,
      "user_id":id})
      .subscribe({
      next:()=> {
        console.log("dsad");
      },
      error:(err)=>{
        if(typeof err.error === 'object' && err.error !== null){
          alert(err.error.message)
        }
        else {
          alert(err.error);
        }
      }})
    this.popupService.close()

  }
  bookTicket():void{
    const sessionItem = this.storageService.getUser()
    if(Object.keys(sessionItem).length!==0){

      this.popupService.open('modal-2');
      this.eventService.getEventSeat(this.routeId).subscribe((seat)=>{
        this.eventSeat=seat.filter((elem)=>elem>0);
        this.selectedSeat=this.eventSeat[0].toString();
      });
    }
    else{
      this.popupService.open('modal-1');
    }

  }

  goToLogin(){
    this.popupService.removeById('modal-1');
    this.router.navigateByUrl('/login');
  }

  findImage(filename:string){
    return "http://127.0.0.1:5000/display/"+filename
  }

}
