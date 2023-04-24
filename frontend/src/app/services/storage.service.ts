import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, map} from "rxjs";
import {UserService} from "./user.service";

const AUTH_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    this.getUser();
    return this.loggedIn.asObservable();
  }
  constructor(private router: Router,private userService: UserService) {
  }

  logOut(): void {
    sessionStorage.clear();
    this.loggedIn.next(true);
    this.router.navigateByUrl('/login');

  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
    this.loggedIn.next(false);
  }

  public getUser(): any {
    const user = sessionStorage.getItem(AUTH_KEY);
    if (user) {
      this.loggedIn.next(false);
      return JSON.parse(user);
    }

    return {};
  }


}
