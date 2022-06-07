import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket } from 'src/app/models/ibasket';
import { IProduct } from 'src/app/models/iproduct';
import { IUser } from 'src/app/models/iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    basket$:Observable<IBasket>;
    UserName : string
    currentUser$: Observable<IUser>;
    constructor( private account:AccountService,private _BasketService:BasketService,private _Router:Router,private _ToastrService:ToastrService) {
    this.basket$=this._BasketService.basket$;
    this.currentUser$=this.account.currentUser$
   }

  ngOnInit(): void {
        this.currentUser$.subscribe((user:IUser)=>{
          this.UserName = user.displayName
      })
  }
  showItmsInBasket()
  {
      this._Router.navigate(['/basket'])
  }
  remove(product:IProduct){
    this._BasketService.remove(product);
    this._ToastrService.info("Removed",undefined,{positionClass: 'toast-bottom-right'});
}


roleMatch(_role:string):boolean{
  let role  = localStorage.getItem("role");
   return _role==role;
}

logout(){
  this.account.logout();
}
}
