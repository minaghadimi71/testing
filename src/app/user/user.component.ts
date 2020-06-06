import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {DataService} from "./data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, DataService]
})
export class UserComponent implements OnInit {
public isLogin = false;
public user: {name: string}
public data: string
  constructor(public userService: UserService, private dataService: DataService) { }

  ngOnInit() {
  this.user = this.userService.user;
  this.dataService.returnData().then((res: string) => {
    this.data = res;
  })

  }

}
