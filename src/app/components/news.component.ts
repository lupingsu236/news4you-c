import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { News } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  username: string; 
  //array to receive results from server
  news: News[] = [];

  constructor(private newsSvc: NewsService, private userSvc: UserService) { }

  ngOnInit(): void {
    //check if user is logged in
    this.userSvc.verifyUser().then(user => { 
      this.username = user.username;
    })
    .catch( err => {
      this.userSvc.logoutUser();
    });;
      

    //call getNews and assign to this.news
    this.newsSvc.getNews()
        .then(result => {
          console.info('news: ', result);
          this.news = result;
        })
        .catch(error => console.error(error.message));
  }

  processLogout() {
    this.userSvc.logoutUser();
    window.location.reload();
  }

}
