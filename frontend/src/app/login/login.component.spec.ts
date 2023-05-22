import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {AuthService} from "../services/auth.service";
import {DebugElement} from "@angular/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // const auth = jasmine.createSpyObj('AuthService', ['loginUser']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
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

});
