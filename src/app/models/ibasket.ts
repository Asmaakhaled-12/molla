import { IProduct } from "./iproduct";
import { v4 as uuidv4 } from 'uuid';

export interface IBasketItems{
  items:IProduct
}

export interface IBasket{
   id:string;
   items:IProduct[];
   clientSecret?:string;
   paymentIntendId?: string;
}

export class Basket implements IBasket{
  id=uuidv4();
  items:IProduct[]=[]
}


