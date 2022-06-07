import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IDeliveryMethod } from 'src/app/models/ideliveryMethod';
import { IOrder } from 'src/app/models/Iorder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  deliverymethod:IDeliveryMethod[];
  address={}as { firstName: string,
  lastName: string,
  street: string,
  city: string} 




  baseUrl:"https://localhost:7282/api/";
  constructor(private _HttpClient:HttpClient) { }


  createOrder(order: any){
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(order); 
    return this._HttpClient.post('https://localhost:7282/api/Orders', order,{headers});
  }

  getDelivetMethos():Observable<IDeliveryMethod[]>{
    return this._HttpClient.get<IDeliveryMethod[]>(`${environment.apiURL}/Orders/deliveryMethods`).pipe(
      map((DM:IDeliveryMethod[])=>{
        this.deliverymethod = DM;
        return DM.sort((a, b) => b.price - a.price);
      })
    );
  }

}
