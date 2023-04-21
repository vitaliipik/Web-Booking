import {Component, OnInit} from '@angular/core';


import {StorageService} from "../services/storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  // @ts-ignore
  isLoggedIn$: Observable<boolean>;




  constructor(private storageService: StorageService) {

  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.storageService.isLoggedIn;

  }

}
