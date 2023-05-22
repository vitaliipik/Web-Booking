import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PermissionService} from "../services/permission.service";

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanActivate {

  constructor(private permissionService:PermissionService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    if(this.permissionService.checkPermission(route.data.permission)){
      return true;
    }

    return this.router.navigateByUrl('/events');
  }

}
