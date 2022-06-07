import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBasket } from 'src/app/models/ibasket';
import { IProduct } from 'src/app/models/iproduct';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$:Observable<IBasket>;
  constructor(private _BasketService:BasketService,private _ToastrService:ToastrService) {
   this.basket$=this._BasketService.basket$;
  }

  ngOnInit(): void {
  }
  increment(product:IProduct){
    this._BasketService.increment(product);
    if(this._BasketService.outOfStock){
      this._ToastrService.error("out Of  Stock",undefined,{positionClass: 'toast-bottom-right'});
    }
  }
  decrement(product:IProduct){
    this._BasketService.decrement(product);
  }
  remove(product:IProduct){
        this._BasketService.remove(product)
        this._ToastrService.info("Removed",undefined,{positionClass: 'toast-bottom-right'});

  }
}
