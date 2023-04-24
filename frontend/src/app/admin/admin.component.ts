import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserItem} from "../models/user.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  constructor(private userService: UserService) { }

  public searchInput = '';
  // @ts-ignore
  public searchResult: Array<any> = [];

  userList:Array<any>  = []
  ngOnInit(): void {
    this.userService.getUsersData().subscribe(users => this.userList=users);
  }
  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe({
      next: ()=>{
        this.userService.getUsersData().subscribe(users => this.userList=users);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
     }
  makeAdmin(username:string){
    const user:UserItem=this.userList.filter((user) => {
      return user.username===username;
    })[0];
    user.role='admin';
    // @ts-ignore
    delete user.password;
    this.userService.updateUser(user).subscribe({
      next: ()=>{
        this.userService.getUsersData().subscribe(users => this.userList=users);
      },
      error: error => {
        alert(error.message);
      }
    });

  }


}
