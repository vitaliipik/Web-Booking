import { Component } from '@angular/core';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  account=true
  constructor(private storage: StorageService) {
  }
  toggleMenu(a: HTMLAnchorElement): void {
  if(a.id==='password-tab'){
    this.account=false;
  }
  else{
    this.account=true;
  }
  }
  logOut(){
    this.storage.logOut();
  }

}
