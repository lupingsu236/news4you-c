import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'news4you';
  constructor(private userSvc: UserService, private router: Router) {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");

    if(username !=null && token != null) {
      let user : User = {username: username, token: token};
      this.userSvc.setCurrentUser(user);
    }
  }

  returnHome() {
    if(window.location.pathname!="") {
      this.router.navigate(['']);
    }
  }

}
