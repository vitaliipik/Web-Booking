import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FilterPipe} from "../pipe/filter.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventService} from "../services/event.service";
import {UserService} from "../services/user.service";
import {Observable, of, throwError} from "rxjs";
import {UserItem} from "../models/user.model";
import {By} from "@angular/platform-browser";

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let userService: jasmine.SpyObj<UserService>;
  const mockUsers: UserItem[] = [
    { username: 'user1', first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '123456789', role: 'admin',password:'d' },
    { username: 'user2', first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', phone: '987654321', role: 'user',password:'d' }
  ];

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['getUsersData','deleteUser','updateUser'])
    userService.getUsersData.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      providers:[{provide: UserService, useValue: userService}],
      declarations: [ UserManagementComponent,
        FilterPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user data on component initialization', () => {


    userService.getUsersData.and.returnValue(of(mockUsers));

    component.ngOnInit();
    expect(userService.getUsersData).toHaveBeenCalled();
    expect(component.userList).toEqual(mockUsers);
  });

  it('should display filtered user list based on search input', () => {

    const searchInput = 'user1';

    userService.getUsersData.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    component.searchInput = searchInput;
    fixture.detectChanges();
    component.ngOnInit()
    fixture.detectChanges()

    const filteredUserList = fixture.debugElement.queryAll(By.css('.actions'));

    expect(filteredUserList.length).toEqual(1); // Including table header
   /* expect(filteredUserList[0].nativeElement.textContent).toContain(searchInput);*/

    component.searchInput = 'user';
    fixture.detectChanges();

    const filteredUserListsecond = fixture.nativeElement.querySelectorAll('.actions');

    expect(filteredUserListsecond.length).toEqual(2);
  });


  it('should delete a user and refresh user list', () => {
    const username = 'user1';

   userService.deleteUser.and.returnValue(of(undefined));
    userService.getUsersData.and.returnValue(of([]));

    component.deleteUser(username);

    expect(userService.deleteUser).toHaveBeenCalledWith(username);
    expect(userService.getUsersData).toHaveBeenCalled();
    expect(component.userList).toEqual([]);
  });

  it('should make a user admin and refresh user list', () => {
    const username = 'user1';

    userService.updateUser.and.returnValue(of({}));
    userService.getUsersData.and.returnValue(of([]));

    component.makeAdmin(username);

    expect(userService.updateUser).toHaveBeenCalledWith(mockUsers[0]);
    expect(userService.getUsersData).toHaveBeenCalled();
    expect(component.userList).toEqual([]);
  });

  it('should handle error when deleting a user', () => {
    const usernameToDelete = 'user1';
    const error = {message:'Delete user error'};

    userService.deleteUser.and.returnValue( new Observable(( (callback: any) => {
      callback.error(error);
    })));

    spyOn(console, 'error');
    spyOn(window, 'alert');

    const buttonDelete=fixture.debugElement.query(By.css(".delete-btn")).nativeElement
    buttonDelete.click()
    component.deleteUser(usernameToDelete);

    expect(userService.deleteUser).toHaveBeenCalledWith(usernameToDelete);
    expect(console.error).toHaveBeenCalledWith('There was an error!', error);
    // expect(window.alert).toHaveBeenCalledWith(error);
  });
});
