import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {global} from './global';

@Injectable()
export class PostService {
  public url: string;


  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  pruebas(){
    console.log('Hola desde el servicio de entradas');
  }

  create(token, post):Observable<any>{
    let json= JSON.stringify(post);
    let params = "json="+json;

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set('Authorization',token);

    return this._http.post(this.url + 'post', params,{headers:headers} );
  }

  getPosts():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlenconded');
    return this._http.get(this.url+'post',{headers:headers});
  }
}
