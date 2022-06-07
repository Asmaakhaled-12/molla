import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../service/orders.service';
import { MultiplicationPipe } from '../../../pipes/multiplication.pipe';
import { IOrder } from 'src/app/models/Iorder';
import { CheckoutService } from 'src/app/checkout/services/checkout.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {

order:any;
// selectedDeliveryMethod:string='';
selectedDeliveryMethod:any;

  ngOnInit(): void {
    this.getDeliveryMethod()
  }
  constructor(private oredrService:OrdersService,
    private activeRoute:ActivatedRoute,
    private checkoutserv:CheckoutService,
    private toastr:ToastrService,
    private router:Router) {
     let id = this.activeRoute.snapshot.paramMap.get('id');
     if(id){
       this.oredrService.getById(id).subscribe((prod:IOrder)=>{
         this.order = prod;
         console.log("orders"+prod)
        });
     }

    //  console.log(this.checkoutserv.deliverymethod.find((d)=>{d.shortName== this.order.deliveryMethod}))
   }

   DeleteOrder(id:number){
this.oredrService.CancelOrder(id).subscribe((cancel)=>{
  // this.toastr.success('Order Deleted Successfully');
  this.toastr.success(
    'Order Deleted Successfully!',
    undefined,
    {
      positionClass: 'toast-bottom-right',
    }
  );
  this.router.navigateByUrl('orders');
})
   }

   getDeliveryMethod(){
     this.checkoutserv.getDelivetMethos().subscribe((res)=>{
       let arr = res;
       console.log(arr);
       console.log(this.order.deliveryMethod)
       this.selectedDeliveryMethod= arr.find(d=>d.shortName = this.order.deliveryMethod)
       console.log(this.selectedDeliveryMethod);
     })
   
  }
}
