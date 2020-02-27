import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {Post} from '../../models/post';
import {global} from '../../services/global';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title:string;
  public identity;
  public token;
  public post:Post;
  public categories;
  public status;
  public is_edit:boolean;
  public url;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "2",
    uploadAPI:  {
      url: global.url+'post/upload',
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu imagen'
  };

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService

  ) {
    this.page_title="Editar una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit=true;
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1,this.identity.sub, 1, '','',null,null);
    this.getPost();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response=>{
        if(response.status="success"){
          this.categories = response.categories;
        }
      },error => {
        console.log(error);
      }
    )
  }

  imageUpload(data){
    console.log(data);
    let image_data = JSON.parse(data.response);
    this.post.image =image_data.image;
  }

  onSubmit(form){
    console.log(this.token,this.post,this.post.id);
    this._postService.update(this.token,this.post,this.post.id).subscribe(

      response=>{
        this.status = 'error';
        if(response.status == 'success'){
          //this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
        }
      },
      error=>{
        console.log(error);
        this.status = 'error';
      }
    );
  }

  getPost(){
    this._route.params.subscribe(params=>{
        let id = +params['id'];

        this._postService.getPost(id).subscribe(
          response =>{
            if(response.status == 'success'){

              this.post = response.post;
              if(this.post.user_id != this.identity.sub){
                this._router.navigate(['inicio']);
              }
            }else {
              this._router.navigate(['inicio']);
            }
          },error=>{
            console.log(error);
            this._router.navigate(['inicio']);
          }
        )
      }
    );
  }
}
