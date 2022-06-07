import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from 'src/app/models/Iorder';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
orders:any
  constructor(private orderServ:OrdersService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.orderServ.getPendingOrders().subscribe((PendingOrders:IOrder[])=>{
      this.orders=PendingOrders;
    })
  }

 Accept(id:number){
this.orderServ.AcceptOrder(id).subscribe((AcceptedOrder)=>{
  this.toastr.success('Order Accepted Successfully ');
this.router.navigateByUrl("orderAdmin");
})
 }
  Reject(id:number){
    this.orderServ.RejectOrder(id).subscribe((RejectedOrder)=>{
      this.toastr.success('Order Rejected Successfully ');
      this.router.navigateByUrl("orderAdmin");
    })
  }
}
