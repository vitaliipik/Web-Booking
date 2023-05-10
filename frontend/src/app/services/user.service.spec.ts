import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UserService', () => {
  let userService: UserService,
    httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  it('should retrieve all courses', () => {
    const username = "test_user"
    const mokeResponse={"message":"Successes", "status_code":200}
    userService.deleteUser(username)
      .subscribe({
        next: response => {


          expect(response).toBe(mokeResponse);


        },
        error: (err) => {
          expect(err).toBe('No user found')
        }
      });

    const req = httpTestingController.expectOne(`/api/v1/user/${username}`);

    expect(req.request.method).toEqual("DELETE");
    req.flush(mokeResponse)
    httpTestingController.verify()
    // expect(req.request.body.titles.description)
    //   .toEqual(changes.titles.description);

  });

  // it('should delete user by username', () => {
  //
  //   userSe.findCourseById(12)
  //     .subscribe(course => {
  //
  //       expect(course).toBeTruthy();
  //       expect(course.id).toBe(12);
  //
  //     });
  //
  //   const req = httpTestingController.expectOne('/api/courses/12');
  //
  //   expect(req.request.method).toEqual("GET");
  //
  //   req.flush(COURSES[12]);
  //
  // });

});
