import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanserviceService } from '../services/loanservice.service';

@Injectable({
  providedIn: 'root'
})
export class MyguardGuard implements CanActivate {
  constructor(private _myserv: LoanserviceService, private _route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._myserv.isLoggedIn()) {
      return true;
      
    } else {
      this._route.navigate(['/login'])
      return false;
    }

  }

}
