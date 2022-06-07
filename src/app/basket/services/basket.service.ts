import { HttpClient } from '@angular/common/http';
import { QueryFlags } from '@angular/compiler/src/render3/view/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IBasket, Basket, IBasketItems } from 'src/app/models/ibasket';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from 'src/app/product/service/product-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl:"https://localhost:7282/api";
  private Basket: any;
  outOfStock:boolean=false;


  private basketSource = new BehaviorSubject<any>(null);
  basket$ = this.basketSource.asObservable();
  constructor(private _HttpClient: HttpClient, private _ProductServiceService: ProductServiceService) { }

  //Create Order  ---islam
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    localStorage.removeItem('basketId');
  }


  createPaymentIntent() {
    return this._HttpClient.post(`${environment.apiURL}`, this.getCurrentBasket().id, {})
      .pipe(
        map((Basket) => {
          this.basketSource.next(Basket);
          console.log(this.getCurrentBasket());
        })
      );
  }


  /// End Create Order  ---islam
  createBasket() {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    // this.setBasket(basket);
    return basket;
  }



  setBasket(basket: IBasket) {
    this._HttpClient
      .post(`${environment.apiURL}/Basket`, basket)
      .subscribe((response) => {
        this.basketSource.next(response);
      });
  }

  updateBasket(basketId: string, basket: IBasket) {
    return this._HttpClient
      .post(`${environment.apiURL}/Basket`, basket)
      .subscribe((response) => {
        this.basketSource.next(response);
      });
  }

  getBasket(id: string): Observable<any> {
    return this._HttpClient
      .get<IBasket>(`${this.baseUrl}/Basket`,{params:{"id":id}})
      .pipe(
        map((basket: IBasket) => {
          console.log("bascket"+basket)
          this.basketSource.next(basket);
        })
      );
  }

  getCurrentBasket(): IBasket {
    console.log(`get current basket +${((this.basketSource.value)as IBasket)}`);
    return this.basketSource.value;

  }

  addItemToBasket(productToAdd: IProduct, quantity: number = 1) {
    const basket = this.getCurrentBasket() ?? this.createBasket();
    const items = this.addOrUpdateItem(basket.items, productToAdd);
    basket.items = items;
    this.updateBasket(basket.id, basket);
  }

  addOrUpdateItem(items: IProduct[], productToAdd: IProduct) {

    this.decrementQuantityOfProduct(productToAdd);

    let productToAddIndex = items.findIndex((i) => i.title == productToAdd.title);

    if (productToAddIndex == -1) {
      productToAdd.quantity = 1;
      items.push(productToAdd);
    }
    else {

      items[productToAddIndex].quantity++;
      if (items[productToAddIndex].quantity <= 0) {
        items.splice(productToAddIndex, 1);
      }
    }
    return items;
  }

  decrementQuantityOfProduct(productToDecrementQantity: IProduct) {
    productToDecrementQantity.quantity--;
    this._ProductServiceService.updateProduct(productToDecrementQantity, productToDecrementQantity.id).subscribe()
  }

  increment(item: IProduct) {
    const basket = this.getCurrentBasket();
    let productIndex = basket.items.findIndex(i => i.id == item.id);
    this._ProductServiceService.getById(item.id).subscribe((product) => {
      if(product.quantity <=0) {this.outOfStock=true; return }
      else {
        this.outOfStock=false;
        basket.items[productIndex].quantity++;
        product.quantity--;
        this._ProductServiceService.updateProduct(product, product.id).subscribe((next => {
          this.updateBasket(basket.id, basket);
        }));

      }
    })

  }
  decrement(item: IProduct) {
    if (item.quantity == 1) {
      console.log(item.quantity);
      this.remove(item);
      return
    }

    const basket = this.getCurrentBasket();
    let productIndex = basket.items.findIndex(i => i.id == item.id);
    basket.items[productIndex].quantity--;
    this._ProductServiceService.getById(item.id).subscribe(product => {
      this.updateBasket(basket.id, basket);
      product.quantity++;
      this._ProductServiceService.updateProduct(product, product.id).subscribe();
    })



  }

  remove(item: IProduct) {
    const basket = this.getCurrentBasket();
    let items = basket.items.filter(i => i.id != item.id);
    this._ProductServiceService.getById(item.id).subscribe(product => {
      basket.items = items;
      this.updateBasket(basket.id, basket);
      product.quantity += item.quantity;
      this._ProductServiceService.updateProduct(product, product.id).subscribe();
    })

  }
  deleteBasket(basket: IBasket) {
    
    return this._HttpClient.delete('https://localhost:7282/api/Basket' ,{params:{"id":basket.id}}).subscribe(() => {
      this.basketSource.next(null);
      localStorage.removeItem('basket');
    }, error => {
      console.log(error);
    });
  }

}
