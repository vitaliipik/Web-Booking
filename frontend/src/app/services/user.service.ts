import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserItem} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<Array<UserItem>> {
    return this.http.get<Array<UserItem>>('/api/v1/user')
  }

  getUserData(username:string,option= {}): Observable<UserItem> {
    return this.http.get<UserItem>(`/api/v1/user/${username}`,option);
  }

  updateUser(user:UserItem): Observable<object> {
    return this.http.put(`/api/v1/user`,user)
  }

  deleteUser(username:string): Observable<any> {
    return this.http.delete(`/api/v1/user/${username}`)
  }

}
