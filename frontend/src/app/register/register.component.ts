import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;

  constructor(private builder: FormBuilder ,private auth: AuthService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.builder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    this.auth.registerUser(this.form)
  }
}
