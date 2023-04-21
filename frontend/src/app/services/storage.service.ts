import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const AUTH_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private router: Router) {
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(AUTH_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(AUTH_KEY);
    if (user) {
      return true;
    }

    return false;
  }


}
