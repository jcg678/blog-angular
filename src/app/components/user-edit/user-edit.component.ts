import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title:string;
  public user:User;
  public identity;
  public token;
  public status;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  constructor(
    private _userService: UserService
  ) {
    this.page_title="Ajustes de usuario";
    this.user = new User(1, '','','ROLE_USER', '','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(this.identity.sub, this.identity.name,this.identity.surname,this.identity.role, this.identity.email,'',this.identity.description,this.identity.image);
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.update(this.token,this.user).subscribe(
      response=>{
        console.log(response);
        if(response && response.status){

          if(response.changes.name){
            this.user.name =  response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname =  response.changes.surname;
          }
          if(response.changes.dscription){
            this.user.description =  response.changes.description;
          }
          if(response.changes.image){
            this.user.image =  response.changes.image;
          }


          this.identity = this.user;
          this.status='success';
          localStorage.setItem('identity',JSON.stringify(this.identity));
        }else{
          this.status = 'response';
        }
      },error => {
        this.status = 'response';
        console.log(<any>error);
      }
    );
  }

}
