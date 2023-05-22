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





}
