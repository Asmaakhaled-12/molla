import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Iorder';
import { OrdersService } from '../../service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe({
      next: (item:IOrder[]) => {
        console.log("my Order"+item)
        this.orders = item;
      }

    });
  }

  // getOrders(){
  //   this.orderService.getOrdersForUser().subscribe((orders: IOrder[]) => {
  //     this.orders = orders;
  //     console.log(orders);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}

