import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;

  constructor(private builder: FormBuilder ,
              private auth: AuthService,
              private storage:StorageService,
              private route:Router,
              private userService:UserService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.builder.group({
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      phone: [''],

      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.auth.registerUser(this.form.value).subscribe({
      next: ()=>{
        this.auth.loginUser(this.form.value).subscribe({next:(res: any) => {
            if (res.status == '404') {
              alert(res.message);
              return;
            }
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + res.basic
              })
            };
            this.userService.getUserData(this.form.value.username, httpOptions).subscribe(
              (elem) => {
                this.storage.saveUser({
                  'token': res.basic,
                  'username': this.form.value.username,
                  'role': elem["role"].slice(5,),
                  'id': elem["id"]
                });
                this.route.navigateByUrl('/events')
              })


          },
          error: (err) => {


            alert(err.error);

          }})
        // this.auth.loginUser({'username':this.form.value.username,'password':this.form.value.password})
        //   .subscribe((res: any) => {
        //   this.storage.saveUser({'token':res.basic,'username':this.form.value.username})//login
        //   this.route.navigateByUrl('/events')
        // })
      },
      error: err => {

        if(typeof err.error === 'object' && err.error !== null){
          alert(err.error.message)
        }
        else {
          alert(err.error);
        }

    }})


}
}
