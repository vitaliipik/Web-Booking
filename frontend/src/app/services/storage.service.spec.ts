import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    storageService = TestBed.inject(StorageService);
  });
  afterEach(()=>{
    sessionStorage.clear()
  })

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });
  it('should initially emit true for isLoggedIn', () => {
    let isLoggedIn: boolean | undefined;

    storageService.isLoggedIn.subscribe((value) => {
      isLoggedIn = value;
    });

    expect(isLoggedIn).toBe(true);
  });

  it('should emit false for isLoggedIn after saving a user', () => {
    let isLoggedIn: boolean | undefined;
    const userData = {
      token: 'token',
      username: 'testuser',
      role: 'user',
      id: 1,
    };

    storageService.isLoggedIn.subscribe((value) => {
      isLoggedIn = value;
    });

    storageService.saveUser(userData);

    expect(isLoggedIn).toBe(false);
  });

  it('should return an empty object when no user is stored', () => {
    const storedUser = storageService.getUser();

    expect(storedUser).toEqual({});
  });

  it('should return the stored user object', () => {
    const userData = {
      token: 'token',
      username: 'testuser',
      role: 'user',
      id: 1,
    };

    storageService.saveUser(userData);
    const storedUser = storageService.getUser();

    expect(storedUser).toEqual(userData);
  });

  it('should clear session storage and navigate to login page on logout', () => {
    spyOn(sessionStorage, 'clear');
    spyOn(storageService["router"], 'navigateByUrl');

    storageService.logOut();

    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(storageService["router"].navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
