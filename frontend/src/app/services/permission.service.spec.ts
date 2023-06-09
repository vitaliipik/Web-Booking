import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Permission} from "../models/permission.model";
import {StorageService} from "./storage.service";

describe('PermissionService', () => {
  let service: PermissionService;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageService = jasmine.createSpyObj('StorageService', ['getUser']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide:StorageService,useValue:storageService}]
    });

    service = TestBed.inject(PermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when the user has the required permission', () => {

    const requiredPermission: Permission = Permission.user;
    const userRole: Permission = Permission.user;

     storageService.getUser.and.returnValue({ role: userRole });

    const hasPermission: boolean = service.checkPermission(requiredPermission);

    expect(hasPermission).toBe(true);
  });

  it('should return false when the user does not have the required permission', () => {

    const requiredPermission: Permission = Permission.admin;
    const userRole: Permission = Permission.user;

    storageService.getUser.and.returnValue({ role: userRole });

    const hasPermission: boolean = service.checkPermission(requiredPermission);

    expect(hasPermission).toBe(false);
  });
});
