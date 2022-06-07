import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IBasket } from 'src/app/models/ibasket';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CheckoutService } from '../../services/checkout.service';
import { IDeliveryMethod } from 'src/app/models/ideliveryMethod';
import { IProduct } from 'src/app/models/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    }
  ]
})
export class CheckoutComponent implements OnInit ,AfterViewInit{


  paymentHandler:any = null;
  @ViewChild ('stepper') stepper: CdkStepper;
  addressForm: FormGroup;
  totalPrice: number = 0;
  basket:IBasket
  delvMethod:any
  deliveryForm:FormGroup;
  basket$:Observable<IBasket>;
  deliverMethod$:Observable<IDeliveryMethod[]>
  selectedDeliveryMethod:string='';
  selectedDeliveryMethodPrice=0;


  constructor(private _BasketService:BasketService,
    private _formBuilder: FormBuilder,
    private toastr:ToastrService,
    private _CheckoutService:CheckoutService,
    private _ToastrService:ToastrService) {
    this.basket$=this._BasketService.basket$;
    this.deliverMethod$=this._CheckoutService.getDelivetMethos();
    this.basket$ = this._BasketService.basket$;
    this.totalPrice = 0;
    this.basket$.subscribe((data) => {

      data.items.forEach((item) => { this.totalPrice += item.price }
      )
      console.log(this.totalPrice)
    })
  }
  ngAfterViewInit(): void {
    this.stepper.selectionChange.forEach((value)=>{
      if(value.selectedIndex==1){
        this.addressData();
      }
      if(value.selectedIndex==2){
        this.delieverymethodData();
      }
      if(value.selectedIndex==4){
        this.submitOrder();
      }

    });
  }
  ngOnInit(): void {
    this.addressForm = new FormGroup({
      firstName:new FormControl (null, [Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)]),
      lastName:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)]),
      country:new FormControl(null,[Validators.required]),
      street:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9,]{10,}$/)]),
      city:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{4,}$/)]),
      ZIP:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{7}$/)]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[012][0-9]{8}$/)]),
      email:new FormControl(null,[Validators.required,Validators.email])
    });

    this.deliveryForm=this._formBuilder.group({
        deliveryMethod:['',Validators.required]
    })



    
  }
  createPayemtnIntenet()
  {
    return this._BasketService.createPaymentIntent().subscribe((res:any) =>{
      this.toastr.success('Payment  Created Successfully');
    },error => {
      console.log(error);
      this.toastr.error(error.message);

    });
  }

  increment(product:IProduct){
    this._BasketService.increment(product);
  }
  decrement(product:IProduct){
    this._BasketService.decrement(product);
  }
  remove(product:IProduct){
        this._BasketService.remove(product)
        this._ToastrService.info("Removed",undefined,{positionClass: 'toast-bottom-right'});

  }

  addressData(){
    this._CheckoutService.address.city=this.addressForm.value.city;
    this._CheckoutService.address.firstName=this.addressForm.value.firstName;
    this._CheckoutService.address.lastName=this.addressForm.value.lastName;
    this._CheckoutService.address.street=this.addressForm.value.street;
  }

  delieverymethodData(){
    console.log(this._CheckoutService.deliverymethod)
    console.log(this.deliveryForm.value)
    this.delvMethod = this._CheckoutService.deliverymethod.find(d=>d.shortName = this.deliveryForm.value.deliveryMethod)
    console.log(this.delvMethod)
    
  }

  submitOrder() {
    // this.loading = true;
     this.basket=this._BasketService.getCurrentBasket();
    console.log("basket"+this.basket);
    const createdOrder = this.getOrderToCreate(this.basket);
    this._CheckoutService.createOrder(createdOrder).subscribe((order:any)=>{
      console.log(order);
      this.toastr.success('order Created Successfully');
      this._BasketService.deleteBasket(this.basket);
    })
  }
  getOrderToCreate(basket: IBasket) {
   return { basketId:basket.id,
    // deliveryMethodId:1,
    deliveryMethodId:this.delvMethod.id,
  shipToAddress:this._CheckoutService.address}
  }


  getDeliveryMethod(data:any){
    this.selectedDeliveryMethodPrice=data.price;
    console.log(data.price);
  }
}
