import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket } from 'src/app/models/ibasket'; import { CheckoutService } from '../../services/checkout.service';
;
declare var paypal: any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {

  basket$: Observable<IBasket>;
  basket:IBasket
  totalPrice: number = 0;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @Input() checkOutForm: FormGroup;
  product = {
    price: 1620,
    description: 'used couch, decent condition',
  };

  paidFor = false;

  constructor(
    private _BasketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    
  ) {

    this.basket$ = this._BasketService.basket$;
    this.totalPrice = 0;
    this.basket$.subscribe((data) => {

      data.items.forEach((item) => { this.totalPrice += item.price-(item.price*item.offer) }
      )
      console.log(this.totalPrice)
    })

  }
  ///Create -Order
  //  submitOrder() {
  //   // this.loading = true;
  //    this.basket=this._BasketService.getCurrentBasket();
  //   console.log("basket"+this.basket);
  //   const createdOrder = this.getOrderToCreate(this.basket);
  //   this.checkoutService.createOrder(createdOrder).subscribe((order:any)=>{
  //     console.log(order);
  //     this.toastr.success('order Created Successfully');
  //     this._BasketService.deleteBasket(this.basket);
  //   })
  // }
  // getOrderToCreate(basket: IBasket) {
    
  //  return { basketId:basket.id,
  //   // deliveryMethodId:1,
  //   deliveryMethodId:this.checkoutService.deliverymethod.id,
    
  // shipToAddress:this.checkoutService.address}
  // }

   ///End Create -Order
  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: (err: any) => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
