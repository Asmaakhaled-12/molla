import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersDetailsComponent } from './Components/orders-details/orders-details.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { SharedModule } from '../Shared/shared.module';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './Components/admin-order-details/admin-order-details.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailsComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
  ]
})
export class OrdersModule { }
