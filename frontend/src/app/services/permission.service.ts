import { Injectable } from '@angular/core';
import {Permission} from "../models/permission.model";
import {StorageService} from "./storage.service";
import {UserService} from "./user.service";
import {UserItem} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private storage:StorageService) {
  }
  // @ts-ignore
  user:UserItem;
  checkPermission(permission: Permission): boolean {

    if(this.storage.getUser().role!=permission){
      return false;
    }
    return true;
  }

}
