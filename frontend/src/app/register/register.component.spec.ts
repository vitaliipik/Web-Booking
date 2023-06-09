import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {of, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserItem} from "../models/user.model";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let authService: AuthService;
  let storageService: StorageService;
  let router: Router;
  let userService: UserService;
  const user: UserItem = {
    email: 'test@test.com',
    first_name: 'Test',
    last_name: 'User',
    id: 1,
    username: 'testuser',
    password: 'password',
    phone: '123456789',
    role: 'role.user'
  };


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [ RegisterComponent ],
      providers: [AuthService, StorageService, UserService],

    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);

    el=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username required error message', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Required');
  });

  it('should display email required error message', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorElement = el.query(By.css('.error'));
    expect(errorElement.nativeElement.textContent).toContain('Incorrect Email');
  });

  it('should display email format error message', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Incorrect Email');
  });

  it('should display password required error message', () => {
    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Required');
  });

  it('should register new account and navigate to events page', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    spyOn(authService, 'registerUser').and.returnValue(of({}));
    spyOn(authService, 'loginUser').and.returnValue(of({ basic: 'token' }));
    spyOn(userService, 'getUserData').and.returnValue(
      of(user)
    );
    spyOn(storageService, 'saveUser');
    spyOn(router, 'navigateByUrl');

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    expect(authService.registerUser).toHaveBeenCalledWith(component.form.value);
    expect(authService.loginUser).toHaveBeenCalledWith(component.form.value);
    expect(userService.getUserData).toHaveBeenCalledWith('testuser', {
      headers: jasmine.any(Object),
    });
    expect(storageService.saveUser).toHaveBeenCalledWith({
      token: 'token',
      username: 'testuser',
      role: 'user',
      id: 1,
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/events');
  });

  it('should display error message on registration failure', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    spyOn(authService, 'registerUser').and.returnValue(throwError({ error: {message:'Registration failed'} }));
    spyOn(window, 'alert');

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();

    expect(authService.registerUser).toHaveBeenCalledWith(component.form.value);
    expect(window.alert).toHaveBeenCalledWith('Registration failed');
  });

  it('should return early if the form is invalid', () => {
    component.form.patchValue({ email: '' });
    const authServiceSpy = spyOn(authService, 'registerUser');

    component.onSubmit();

    expect(authServiceSpy).not.toHaveBeenCalled();
  });
  it('should display an error alert when login fails', () => {
    const errorMessage = 'Login failed';
    component.form.patchValue(user)
    fixture.detectChanges()

    const registerUserResponse = of({});
    const loginUserResponse = throwError({ error: errorMessage });
    spyOn(authService,"registerUser").and.returnValue(registerUserResponse);
    spyOn(authService,"loginUser").and.returnValue(loginUserResponse);
    const alertSpy = spyOn(window, 'alert');

    component.onSubmit();

    expect(authService.registerUser).toHaveBeenCalledWith(component.form.value);
    expect(authService.loginUser).toHaveBeenCalledWith(component.form.value);
    expect(alertSpy).toHaveBeenCalledWith(errorMessage);
  });
});
