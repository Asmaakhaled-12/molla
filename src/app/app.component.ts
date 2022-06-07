import { Component } from '@angular/core';
import { AccountService } from './account/services/account.service';
import { BasketService } from './basket/services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ecommerceApp';
  resbonse:any=null;
  constructor(private account:AccountService, private _BasketService:BasketService)
  {
    this.loadCurrentUser();
   
    const basketId=localStorage.getItem('basketId');

    if(basketId)
    {
      this._BasketService.getBasket(basketId).subscribe((response)=>{
        
      });

    }

  }


  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
    this.account.loadCurrentUser(token).subscribe((res)=>{
    })}
  }
  }
