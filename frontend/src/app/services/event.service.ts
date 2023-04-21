import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {EventItem} from "../models/event.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEventsData(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>('/api/v1/event')
  }

  getEvent(id: any): Observable<EventItem> {
    return this.http.get<EventItem>('/api/v1/event/'+id)
  }

}
