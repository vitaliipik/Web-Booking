import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';


import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor(private builder: FormBuilder ,private auth: AuthService, private route: Router, private storage: StorageService) {

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
    if(this.form.valid){
      this.auth.loginUser(this.form.value).subscribe((res: any) => {
        this.storage.saveUser({'token':res.basic,'username':this.form.value.username})
        // localStorage.setItem('token',res.basic)
        // localStorage.setItem('username',this.form.value.username)
        this.route.navigateByUrl('')
      })
    }

  }
}
