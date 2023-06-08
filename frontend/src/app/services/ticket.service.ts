import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketItem,TicketInput} from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTicketsData(username: string): Observable<TicketItem[]> {
    return this.http.get<TicketItem[]>(`/api/v1/user/${username}/tickets`)
  }

  buyTicket(data:TicketInput): Observable<TicketItem[]> {
    return this.http.post<TicketItem[]>(`/api/v1/ticket`,data)
  }
  cancelTicket(id:string): Observable<TicketItem[]> {
    return this.http.delete<TicketItem[]>(`/api/v1/cancelTicket/${id}`)
  }
}
