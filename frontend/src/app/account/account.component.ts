import {Component, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UserItem} from "../models/user.model";
import {AuthService} from "../services/auth.service";
import {map, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  account:boolean;
  edit:boolean;
  // @ts-ignore
  user:UserItem;

  form!: FormGroup;

  private initForm(user:UserItem) {
    this.form = this.builder.group({
      username: [user.username, Validators.required],
      first_name: [user.first_name],
      last_name: [user.last_name],
      phone: [user.phone],
      email: [user.email,
        Validators.compose([Validators.required,
          Validators.email])],
      password: [''],
    })
  }

  constructor(private storage: StorageService,
              private userService:UserService,
              private builder:FormBuilder,
              private auth:AuthService) {
    this.account=true;
    this.edit=false;

  }
  toggleMenu(a: HTMLAnchorElement): void {
  if(a.id==='password-tab'){
    this.account=false;
  }
  else{
    this.account=true;
  }
  }
  logOut(): void{
    this.storage.logOut();
  }
  toggleEdit():void{
    this.edit=!this.edit;
  }

  ngOnInit(): void {

    this.userService.getUserData(this.storage.getUser().username)
      .subscribe(user=>{
        this.user=user;
        this.initForm(this.user);
      })

  }
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.userService.updateUser(this.form.value).pipe(tap(_=> {
      // this.auth.loginUser({'username':this.form.value.username,"password":this.form.value.password}).pipe((res: any) => {
      this.userService.getUserData(this.form.value.username).pipe(map(
          (elem) => {
            this.storage.saveUser({
              // 'token': res.basic,
              'username': this.form.value.username,
              'role': elem["role"].slice(5,)
            })
          })
        )
//       }}
// )
    }),
      catchError(err => {
      alert(err.error);
      return of(null);
    })).subscribe();



  }



}
