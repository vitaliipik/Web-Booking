import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';


import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {map} from "rxjs";
import {UserService} from "../services/user.service";
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor(private builder: FormBuilder ,
              private auth: AuthService,
              private route: Router,
              private storage: StorageService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
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

    }

  }
}
