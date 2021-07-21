import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NewsService } from '../news.service';
import { WebcamImage } from 'ngx-webcam';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { News, User } from "../models";
import { UserService } from '../user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  //to store latest snapshot
  webcamImage: WebcamImage = null; 
  subscription: Subscription;
  form: FormGroup;
  post_title: string = null; 
  comments: string = null;

  constructor(private fb: FormBuilder, private router: Router,
    private newsSvc: NewsService, private postSvc: PostService, private userSvc: UserService) { }

  ngOnInit(): void {
    this.subscription = this.postSvc.currentImage.subscribe(image => this.webcamImage = image);
    
    this.form = this.postSvc.getFormData()? this.postSvc.getFormData() : this.fb.group({
      post_title: this.fb.control(this.post_title, [Validators.required]), 
      comments: this.fb.control(this.comments, [Validators.required])
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.postSvc.updateFormData(this.form);
  }

  clearFormAndImage() {
    this.form.reset();
    this.postSvc.clearPost();
  }

  cancelPost() {
    this.postSvc.clearPost();
    this.router.navigate(['']);
  }

  processForm() {
    console.info('form details', this.form.value);
    let post: News = {
      title: this.form.value.post_title, 
      comments: this.form.value.comments, 
      image: this.webcamImage.imageAsDataUrl, 
      createdby: this.userSvc.getUsername() 
    };
    this.newsSvc.createNews(post)
        .then(() => {
          this.clearFormAndImage();
          this.router.navigate(['']);
        })
        .catch(error => {
          if(error.status == 401) {
            console.error("Unauthorised, please login");
          } 
          else if(error.status == 500) {
            console.error("Server error");
          }
        });
  }


}
