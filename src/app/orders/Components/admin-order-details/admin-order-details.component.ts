import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from 'src/app/checkout/services/checkout.service';
import { IOrder } from 'src/app/models/Iorder';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  order:any
  selectedDeliveryMethod:any;

  constructor(private oredrService:OrdersService,
    private checkoutserv:CheckoutService,
    private toastr:ToastrService,
    private activeRoute:ActivatedRoute,
    private router:Router) {
     let id = this.activeRoute.snapshot.paramMap.get('id');
     if(id){
       this.oredrService.getById(id).subscribe((prod:IOrder)=>{
         this.order = prod;
         console.log("order"+prod)
        });
     }
   }

  ngOnInit(): void {
    this.getDeliveryMethod();
  }
  

  Accept(id:number){
    this.oredrService.AcceptOrder(id).subscribe((AcceptedOrder)=>{
      //this.toastr.success('Order Accepted Successfully ');
      this.toastr.success(
        'Order Accepted Successfully!',
        undefined,
        {
          positionClass: 'toast-bottom-right',
        }
      );
    this.router.navigateByUrl("orderAdmin");
    })
     }
      Reject(id:number){
        this.oredrService.RejectOrder(id).subscribe((RejectedOrder)=>{
          //this.toastr.success('Order Rejected Successfully ');
          this.toastr.success(
            'Order Rejected Successfully!',
            undefined,
            {
              positionClass: 'toast-bottom-right',
            }
          );
          this.router.navigateByUrl("orderAdmin");
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
