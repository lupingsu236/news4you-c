import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { News, User } from "./models";

//const BASE_URL = 'http://localhost:3000';

@Injectable()
export class NewsService {
    constructor(private http: HttpClient, private userSvc: UserService) {}

    getNews(): Promise<News[]> {
        return this.http.get<News[]>(`/api/news`).toPromise();
    }

    createNews(news: News): Promise<News> {
        let headers = {'Authorization': `Bearer ${this.userSvc.getToken()}` };
        return this.http.post<News>(`/api/news/create`, news, {headers}).toPromise();
    }
}