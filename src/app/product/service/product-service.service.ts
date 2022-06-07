import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public search = new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }


  ///GET-ALL
  getAllProducts():Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(`${environment.apiURL}/Products`);
  }
///Add-Product
  addProduct(product:IProduct):Observable<IProduct>
  {
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<IProduct>(`${environment.apiURL}/Products`,product,{headers});
  }
  ///Update
  getById(id:number|string):Observable<IProduct>
  {

    return this.http.get<IProduct>(`${environment.apiURL}/Products/${id}`);

  }
  updateProduct(product:any,id:number)
  {
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>(`${environment.apiURL}/Products/${id}`,product,{headers});
  }
  deleteProduct(id:number|string):Observable<IProduct>
  {
    return this.http.delete<IProduct>(`${environment.apiURL}/Products/${id}`);
  }

}
