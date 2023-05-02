import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private httpBackClient: HttpClient,private httpBack: HttpBackend) {
  this.httpBackClient=new HttpClient(httpBack);
  }

  registerUser(data: any) {
    return this.http
      .post('/api/v1/user',data)
  }
  loginUser(data: any) {
    return this.http
      .post('/api/v1/user/login',data);
  }

}
