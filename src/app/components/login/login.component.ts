import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;

  constructor(
    private _userService: UserService
  ) {
    this.page_title ='Identificate';
    this.user = new User(1, '','','ROLE_USER', '','','','');
  }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(this.user);
  }

}
