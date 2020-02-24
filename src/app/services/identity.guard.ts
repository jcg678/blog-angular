import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {UserService} from './user.service';
import {identity} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class IdentityGuard implements CanActivate {
  //public canActivate;


  constructor(
    private _router: Router,
    private _userService: UserService
  ) {

  }

  canActivate() {
    let identity = this._userService.getIdentity();

    console.log(identity);
    if(identity){

      return true;
    }else{
      this._router.navigate(['/inicio']);

      return false;
    }
    return false;
  }
   /*
      this._userService.getIdentity()
        .then( (respuesta)=>{
          return true;
        }
        ).catch(() => {
      this._router.navigate(['/inicio']);

       return false;

    });*/

}
