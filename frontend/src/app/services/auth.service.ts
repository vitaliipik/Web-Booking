import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registerUser(data: any): any {
    return this.http
      .post('/api/v1/user',data)
  }
  loginUser(data: any): any {
    return this.http
      .post('/api/v1/user/login',data);
  }

}
