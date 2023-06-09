import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {AuthService} from "../services/auth.service";
import {DebugElement} from "@angular/core";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {RouterTestingModule} from "@angular/router/testing";
import {EventListComponent} from "../event-list/event-list.component";
import {Router, Routes} from "@angular/router";
import {Observable} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // const auth = jasmine.createSpyObj('AuthService', ['loginUser']);
  let authService: AuthService;
  let storageService: StorageService;
  let userService: UserService;
  // let router: Router;
  //
  // const routes = [
  //   {path: 'events', component: EventListComponent}] as Routes;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [
        AuthService
        // {
        //   provide: AuthService, useValue: auth
        // }
      ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
  it('username field validity', () => {
    const username = component.form.controls['username']
    expect(username.valid).toBeFalsy();
  });
  it('username field error validity', () => {

    const username = component.form.controls['username']
    const errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  // it('should call the onSubmit method', () => {
  //   expect(component.form.valid).toBeFalsy();
  //   const MockData={
  //     username:"username",
  //     password:"passwor2d"
  //   }
  //   component.form.setValue(MockData)
  //   expect(component.form.valid).toBeTruthy();
  //   fixture.detectChanges()
  //   // spyOn(component,'onSubmit')
  //   // const button =fixture.debugElement.query(By.css('button')).nativeElement;
  //   // button.click();
  //   component.onSubmit()
  //   expect(auth.loginUser).toHaveBeenCalledWith(MockData);
  //   // const expectedMsg =
  //   //   `Your Registration Information:
  //   //
  //   // basic: ${dummyData.username}
  //   // `;
  //   // expect(fnc).toHaveBeenCalledWith(expectedMsg);
  //   // expect(Location.path()).toBe('/events')
  // });
  // it('should call auth login method', async(() => {
  //
  //   const debugElement = fixture.debugElement;
  //   const authService = debugElement.injector.get(AuthService);
  //   const loginSpy = spyOn(authService, 'loginUser').and.callThrough();
  //   const loginElement = fixture.debugElement.query(By.css('form'));
  //   // to set values
  //   component.form.controls['username'].setValue('user');
  //   component.form.controls['password'].setValue('123');
  //   loginElement.triggerEventHandler('ngSubmit', null);
  //   expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
  // }));



  it('should display error messages for invalid form fields', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    const passwordInput = fixture.nativeElement.querySelector('#password');

    // Test invalid username
    component.form.controls['username'].setValue('');
    component.form.controls['username'].markAsTouched()
    component.form.controls['password'].setValue('validpassword');
    fixture.detectChanges();
    expect(usernameInput.classList.contains('ng-invalid')).toBe(true);
    expect(fixture.nativeElement.querySelector('.error').textContent).toContain('Required');

    // Test invalid password
    component.form.controls['username'].setValue('validusername');
    component.form.controls['password'].setValue('');
    component.form.controls['password'].markAsTouched()
    fixture.detectChanges();
    expect(passwordInput.classList.contains('ng-invalid')).toBe(true);
    expect(fixture.nativeElement.querySelector('.error').textContent).toContain('Required');
  });

  it('should submit the form and perform necessary actions', () => {
    spyOn(authService, 'loginUser').and.returnValue(new Observable(
       (callback: any) => {
        const res = { status: '200', basic: 'validtoken' };
        callback.next(res);
      }
    ));

    spyOn(userService, 'getUserData').and.returnValue(
      new Observable(( (callback: any) => {
        const userData = { role: 'Role.admin', id: 123 };
        callback.next(userData);
      }))
    );

    spyOn(storageService, 'saveUser');

    spyOn(component['router'], 'navigateByUrl');

    const usernameInput = fixture.nativeElement.querySelector('#username');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    usernameInput.value = 'validusername';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'validpassword';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(authService.loginUser).toHaveBeenCalledWith({ username: 'validusername', password: 'validpassword' });
    expect(userService.getUserData).toHaveBeenCalledWith('validusername', jasmine.any(Object));
    expect(storageService.saveUser).toHaveBeenCalledWith({
      token: 'validtoken',
      username: 'validusername',
      role: 'admin',
      id: 123
    });
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/events');
  });


  it('should handle error during login', () => {
    spyOn(authService, 'loginUser').and.returnValue(new Observable((callback: any) => {
        const error = { error: 'Invalid credentials' };
        callback.error(error);
      }
    ));

    spyOn(window, 'alert');

    const usernameInput = fixture.nativeElement.querySelector('#username');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    usernameInput.value = 'invuser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'invpass';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(authService.loginUser).toHaveBeenCalledWith({ username: 'invuser', password: 'invpass' });
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should render the login page components correctly', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Login to Your Account');
    expect(fixture.nativeElement.querySelector('label[for="username"]').textContent).toContain('Username');
    expect(fixture.nativeElement.querySelector('label[for="password"]').textContent).toContain('Password');
    expect(fixture.nativeElement.querySelector('.signup-link').textContent).toContain('Not registered yet?');
    expect(fixture.nativeElement.querySelector('.forgot-password a').textContent).toContain('Forgot password?');
  });


  it('should submit the form and handle 404 status', () => {
    spyOn(authService, 'loginUser').and.returnValue(new Observable((callback: any) => {
        const res = { status: '404', error: 'Invalid password or username specified' };
        callback.error(res);
      }
    ));

    spyOn(window, 'alert');

    const usernameInput = fixture.nativeElement.querySelector('#username');
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    usernameInput.value = 'nonexistentuser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.nativeElement.click();


    expect(authService.loginUser).toHaveBeenCalledWith({ username: 'nonexistentuser', password: 'password123' });
    expect(window.alert).toHaveBeenCalledWith('Invalid password or username specified');
  });

});
