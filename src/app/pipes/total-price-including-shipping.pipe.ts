import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Pipe({
  name: 'totalPriceIncludingShipping'
})
export class TotalPriceIncludingShippingPipe implements PipeTransform {

  transform(items:IProduct[],shippingPrice:number): number {
    let totalPrice=shippingPrice;
    items.forEach((item)=>{
      totalPrice+=(item.price-(item.price*item.offer))*item.quantity;
    })
     return totalPrice;
  }

}