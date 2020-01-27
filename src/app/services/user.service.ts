import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService {
  public url:string;
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  test(){
    return "Hola desde el servicio";
  }

  register(user): Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url+'register', params, {headers: headers});
  }

  signup(user, gettoken = null): Observable<any>{
    if(gettoken != null ){
      user.gettoken =  'true';
    }

    let json =JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', params, {headers:headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    this.identity=null;
    if(identity && identity != "undefined"){
      this.identity =identity;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    this.token=null;
    if(token && token != "undefined"){
      this.token =token;
    }

    return this.token;
  }
}