import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(items:IProduct[]):number  {
   let totalPrice=0
    items.forEach((item)=>{
      totalPrice+=item.price*item.quantity;
    })
     return totalPrice;
  }

}
