import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanserviceService } from '../services/loanservice.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  constructor(private _myserv: LoanserviceService, private _route: Router, private _toastr:ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if(this._myserv.getUserRole()=='admin'){
  return true;
}else{
  this._route.navigate(['/homeuser'])
  this._toastr.warning("You don't have access")
  // alert("you dont have access")
  return false;
}
    
}
  
}
