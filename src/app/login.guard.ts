import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private userSvc: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): true|UrlTree {
      const url: string = state.url;
      if(this.userSvc.getUsername()!=null) {
        return true;
      } 
      else {
        this.userSvc.redirectUrl = url;
        return this.router.parseUrl("/login");
      }
  }
}