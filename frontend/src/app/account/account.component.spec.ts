import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PopupComponent} from "../popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserItem} from "../models/user.model";
import {StorageService} from "../services/storage.service";
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userServiceMock:jasmine.SpyObj<UserService>;
  let storageServiceMock:jasmine.SpyObj<StorageService>;
  let el:DebugElement;
  const mockUserData:UserItem = {
    username: 'testuser',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    password: 'f',
    role: 'role.user',
    id:3
  };
  const storageInfo = {
    token: 'validtoken',
    username: 'validusername',
    role: 'admin',
    id: 123
  }
  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUserData', 'updateUser']);
    storageServiceMock = jasmine.createSpyObj('StorageService', ['getUser', 'logOut']);
    userServiceMock.getUserData.and.returnValue(of(mockUserData))
    storageServiceMock.getUser.and.returnValue(of(storageInfo))
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [ AccountComponent,PopupComponent ],
    providers:[ { provide: UserService, useValue: userServiceMock },
      { provide: StorageService, useValue: storageServiceMock }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize component with correct initial state', () => {
    expect(component.account).toBe(true);
    expect(component.edit).toBe(false);
    expect(component.user).toBeDefined();
    expect(component.form).toBeDefined();
  });

  it('should enable editing of account information', () => {
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('.edit-button');
    editButton.click();

    fixture.detectChanges();

    const inputElements = fixture.nativeElement.querySelectorAll('input');

    expect(inputElements.length).toBeGreaterThan(0);
    expect(inputElements[0].disabled).toBeFalsy();
    expect(inputElements[1].disabled).toBeFalsy();
  });

  it('should toggle account menu correctly', () => {
    const anchorElement: HTMLAnchorElement = { id: 'password-tab' } as HTMLAnchorElement;
    component.toggleMenu(anchorElement);
    expect(component.account).toBe(false);

    component.toggleMenu({} as HTMLAnchorElement);
    expect(component.account).toBe(true);
  });
  describe('Edit User Test',()=>{

    beforeEach(()=>{
      const editButton = fixture.nativeElement.querySelector('.edit-button');
      editButton.click();
      fixture.detectChanges()
    })



    // it('should update account information and notify user', () => {
    //   const updatedUser = {
    //     username: 'testuser',
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     email: 'john.doe@example.com',
    //     phone: '1234567890'
    //   };
    //   userServiceMock.updateUser.and.returnValue(of(updatedUser));
    //
    //   fixture.detectChanges();
    //
    //   // Simulate user input and form submission
    //
    //   fixture.detectChanges();
    //
    //   const successMessageElement = fixture.nativeElement.querySelector('.success-message');
    //
    //   expect(userServiceMock.updateUser).toHaveBeenCalledWith(component.form.value);
    //   expect(successMessageElement.textContent).toEqual('Account information updated successfully.');
    // });

    it('should submit form with valid data', () => {
      component.form.patchValue({
        username: 'testuser',
        first_name: 'John',
        last_name: 'Doe',
        phone: '123456789',
        email: 'test@example.com',
        password: ''
      });
      const submitButton = fixture.debugElement.query(By.css('.submit-button'));
      submitButton.nativeElement.click();


      expect(userServiceMock.updateUser).toHaveBeenCalledWith(component.form.value);

    });

  })



  it('should log out the user', () => {
    fixture.detectChanges();

    const logoutButton = fixture.nativeElement.querySelector('#logout-tab');
    logoutButton.click();

    expect(storageServiceMock.logOut).toHaveBeenCalled();
  });

});
