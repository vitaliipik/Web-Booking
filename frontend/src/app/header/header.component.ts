import {Component,  OnInit} from '@angular/core';


import {StorageService} from "../services/storage.service";
import {Observable} from "rxjs";
import {Permission} from "../models/permission.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLoggedIn$: Observable<boolean> | undefined;
  permission$:   Observable<Permission> | undefined;
  permissionBool:   Permission | undefined;



  constructor(private storageService: StorageService) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.storageService.isLoggedIn;
    this.permission$ = this.storageService.permission;
  this.permission$.subscribe((el)=>{
    this.permissionBool=el
  })
  }

  protected readonly Permission = Permission;
}
