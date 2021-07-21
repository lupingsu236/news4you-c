import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./models";

//const BASE_URL = 'http://localhost:3000';

@Injectable()
export class UserService {
    private user: User = null; 
    redirectUrl: string = null;
    constructor(private http: HttpClient) {}

    authenticateUser(user: User): Promise<User> {
        return this.http.post<User>(`/api/users`, user).toPromise();
    }

    setCurrentUser(user: User) {
        this.user = user; 
    }

    getUsername() : string {
        this.verifyUser().then()
        .catch( err => {
            this.logoutUser();
        });

        if(this.user) {
            return this.user.username;
        }
        return null;

    }

    getToken() : string {
        this.verifyUser().then()
        .catch( err => {
            this.logoutUser();
        });
        if(this.user) {
            return this.user.token;
        }
        return null;        
    }

    verifyUser() : Promise<User> {
        if(!this.user) {
            return Promise.reject();
        } else {
            return this.http.post<User>(`/api/users/verify`, this.user).toPromise();
        }
        
    }

    logoutUser() : void {
        this.user = null; 
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
    }


}