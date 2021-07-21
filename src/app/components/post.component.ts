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
  errorMsg_title: string = null;
  errorMsg_comments: string = null;
  errorMsg_image: string = null;

  constructor(private fb: FormBuilder, private router: Router,
    private newsSvc: NewsService, private postSvc: PostService, private userSvc: UserService) { }

  ngOnInit(): void {
    this.subscription = this.postSvc.currentImage.subscribe(image => this.webcamImage = image);
    
    this.form = this.postSvc.getFormData()? this.postSvc.getFormData() : this.fb.group({
      post_title: this.fb.control("", [Validators.required]), 
      comments: this.fb.control("", [Validators.required])
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
    //check if any field is null/empty
    if(this.form.value.post_title.trim()!="" && this.form.value.comments!= "" && this.webcamImage != null) {
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
    else {
        this.errorMsg_title = 
          this.form.value.post_title == null || this.form.value.post_title.trim()==""? "Please enter title!": null;
        this.errorMsg_comments = 
          this.form.value.comments == null || this.form.value.comments.trim()==""? "Please enter comments!": null;
        this.errorMsg_image = this.webcamImage == null? "Please snap a photo!": null;
    }
  }


}
