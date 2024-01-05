import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService implements CanActivate{
  private loginState = new BehaviorSubject<boolean>(false);
  currentLoginState = this.loginState.asObservable();

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) { }
  changeLoginState(loginState: boolean){
    this.loginState.next(loginState);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('token');
    if(!cookie){
      this.router.navigate(['login']);
      return false;
    }else{
      return true;
    }

    //console.log(this.loginState.value);
    //if(this.loginService.isAuthenticated()){
    //  return true;}

  }
}
