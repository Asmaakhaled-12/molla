import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private router:Router,private toastr:ToastrService,private account:AccountService) { console.log("ctor auth");}
  
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|Observable<boolean>{
      let t  = localStorage.getItem('token');
      if(t) return true ;
      else {
        this.toastr.error(
          'Sorry, you must login first !',
          undefined,
          {
            positionClass: 'toast-bottom-right',
          }
        );
        //alert("Sorry, you must login first !");
             this.router.navigateByUrl("login");
          return false;
      }
    }


}
