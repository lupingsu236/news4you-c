import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMsg: string = null;

  constructor(private fb: FormBuilder, private router: Router,
     private userSvc: UserService) { }

  ngOnInit(): void {
    //if already logged in, navigate back to home page
    if(this.userSvc.getUsername()!=null)
      this.router.navigate(['']);

    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]), 
      password: this.fb.control('', [Validators.required])
    })
  }

  processLogin() {
    let user: User = {
      username: this.form.value.username, 
      password: this.form.value.password
    };

    this.userSvc.authenticateUser(user)
        .then( user => {
          this.userSvc.setCurrentUser(user);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.token);
          if(this.userSvc.redirectUrl) {
            this.router.navigate([this.userSvc.redirectUrl]);  
          } 
          else {
            this.router.navigate(['']); 
          }
          
        })
        .catch(error => {
            this.errorMsg = "Incorrect username or password!";
        });
  }

}
