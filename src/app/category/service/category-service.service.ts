import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory } from 'src/app/models/icategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  refreshObservable:BehaviorSubject<boolean>;
  constructor(private _HttpClient:HttpClient) {
    this.refreshObservable=new BehaviorSubject<boolean>(true);
   }

  getAll():Observable<ICategory[]>{
     return this._HttpClient.get<ICategory[]>(`${environment.apiURL}/products/categories`);
  }

  getById(id:number):Observable<ICategory>{
      return this._HttpClient.get<ICategory>(`${environment.apiURL}/products/categories/${id}`)
  }
  add(newCategory:ICategory):Observable<ICategory>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._HttpClient.post<ICategory>(`${environment.apiURL}/products/categories`,(newCategory),{headers});
  }

  delete(CatId:number):Observable<ICategory>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._HttpClient.delete<ICategory>(`${environment.apiURL}/products/categories/${CatId}`,{headers})
  }

  edit(catId:number,editedCtegory:any):Observable<any>{
    let headers = new HttpHeaders();
    headers=headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this._HttpClient.put(`${environment.apiURL}/products/categories/${catId}`,editedCtegory,{headers});
  }
}
