import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {StorageService} from "../services/storage.service";

export interface User {
  name: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userLogged= false




  constructor(private storageService: StorageService) {

  }
  ngOnInit(): void {
    this.userLogged=this.storageService.isLoggedIn()

  }


}
