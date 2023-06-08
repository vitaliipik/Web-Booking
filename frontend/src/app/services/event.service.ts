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

  getEventSeat(id: any): Observable<number[]> {
    return this.http.get<number[]>('/api/v1/event/seat/'+id)
  }

  postEvent(data: EventItem): Observable<any> {
    return this.http.post<EventItem>('/api/v1/event',data)
  }
  updateEvent(data: EventItem): Observable<any> {
    return this.http.put<EventItem>('/api/v1/event',data)
  }

  deleteEvent(id:any): Observable<any> {
    return this.http.delete<EventItem>('/api/v1/event/'+id)
  }

  uploadImage(Image:any): Observable<any> {
    return this.http.post<File>('/api/v1/upload/file',Image)
  }

  getImage(filename:string): Observable<any> {
    return this.http.get('display/'+filename)
  }

}
