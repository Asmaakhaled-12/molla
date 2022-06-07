import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from 'src/app/models/Iorder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
baseUrl ="https://localhost:7282/api";
private orderSource = new BehaviorSubject<any>(null);
  order$ = this.orderSource.asObservable();
 //baseUrl =environment.apiURL;
  constructor(private http:HttpClient) { }

  getOrdersForUser():Observable<IOrder[]>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<IOrder[]>('https://localhost:7282/api/Orders',{headers});
  }
  getOrderDetails(id:number):Observable<IOrder>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<IOrder>('https://localhost:7282/api/Orders/'+id,{headers});
  }
  getById(id:number|string)
  {
    return this.http.get<IOrder>(this.baseUrl +'/orders/'+ id);
  }

  getPendingOrders():Observable<IOrder[]>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<IOrder[]>("https://localhost:7282/api/Orders/PendingOrders",{headers})
  }
  

  AcceptOrder(id:number){
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put('https://localhost:7282/api/Orders/AcceptOrder/'+id, null,{headers})
  }

  RejectOrder(id:number){
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put('https://localhost:7282/api/Orders/RejectOrder/'+id, null,{headers})
  }

  CancelOrder(id:number){
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete('https://localhost:7282/api/Orders/'+id,{headers})
  }




}
