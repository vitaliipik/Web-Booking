import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import {StorageService} from "./storage.service";
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService,private router: Router) {
  }

  token = this.storageService.getUser().token;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = req.clone({
      setHeaders: {
        Authorization: 'basic ' + this.token
      }
    });
    return next.handle(token).pipe(
      catchError((err:HttpErrorResponse)=>{
      if(err.status === 401) {
        this.router.navigate(['/login']);
      }
      // else if(err.status === 403) {
      //   this.router.navigate(['/forbidden']);
      // }
      return throwError("Some thing is wrong");
    }))
  }
}
