import {Component, ElementRef} from '@angular/core';
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DropdownSearchComponent {
  constructor(private _eref: ElementRef,
              private eventService: EventService,
  private router:Router) {
    this.eventService.getEventsData().subscribe(events => this.events = events);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  events:Array<any>  = [];
  onClick(event: Event): any {
    //if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.toggle = true
  }

  goToEvent(id:string){
    this.router.navigateByUrl("/event/"+id);
  }
  toggle = false;

  fetchSeries(event: any): any {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.events.filter((series) => {
      return series.name.toLowerCase().includes(event.target.value.toLowerCase());
    }).slice(0, 5)
    this.toggle = false;
  }


  public searchInput = '';
  public searchResult: Array<any> = [];

}
