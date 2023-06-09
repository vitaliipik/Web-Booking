import {async, TestBed} from '@angular/core/testing';

import { FeatureGuard } from './feature.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {PermissionService} from "../services/permission.service";
import {Observable} from "rxjs";
import {EventService} from "../services/event.service";

describe('FeatureGuard', () => {
  let guard: FeatureGuard;
  let permissionService:jasmine.SpyObj< PermissionService>;
  let router: Router;

  beforeEach(() => {
    permissionService=jasmine.createSpyObj('PermissionService',['checkPermission'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
providers:[{provide: PermissionService, useValue:permissionService}]
    });
    guard = TestBed.inject(FeatureGuard);

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });




  it('should allow access if user has the required permission', () => {
    permissionService.checkPermission.and.returnValue(true);
    spyOn(router, 'navigateByUrl')
    const routeSnapshot = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', [], { data: { permission: 'requiredPermission' } });
    const stateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(permissionService.checkPermission).toHaveBeenCalledWith(routeSnapshot.data["permission"]);
    expect(result).toBeTrue();
  });

  it('should redirect to "/events" if user does not have the required permission', () => {
    permissionService.checkPermission.and.returnValue(false);
    spyOn(router, 'navigateByUrl');
    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.data = { permission: 'requiredPermission' };
    const stateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(result).toBeFalsy()
    // expect(permissionService.checkPermission).toHaveBeenCalledWith('requiredPermission');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/events');
  });

});
