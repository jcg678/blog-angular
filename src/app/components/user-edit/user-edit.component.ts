import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { global} from '../../services/global';

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
  public url;
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpgeg",
    maxSize: "2",
    uploadAPI:  {
      url: global.url+'user/upload',
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinBtn: 'Sube tu avatar de usuario'
    };

  constructor(
    private _userService: UserService
  ) {
    this.page_title="Ajustes de usuario";
    this.user = new User(1, '','','ROLE_USER', '','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
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

  avatarUpload(datos){
    console.log(datos);
    let data = JSON.parse(datos.response);
    this.user.image =data.image;
  }

}
