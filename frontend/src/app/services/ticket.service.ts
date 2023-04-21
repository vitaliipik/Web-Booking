import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketItem} from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTicketsData(username: string): Observable<TicketItem[]> {
    return this.http.get<TicketItem[]>(`/api/v1/user/${username}/tickets`)
  }
}
