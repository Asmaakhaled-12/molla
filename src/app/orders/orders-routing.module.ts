import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';
import { OrdersDetailsComponent } from './Components/orders-details/orders-details.component';
import { OrdersComponent } from './Components/orders/orders.component';


const routes: Routes = [
  {path:'',component:OrdersComponent},
  {path:'details/:id',component:OrdersDetailsComponent},
  // {path:"orderAdmin",component:AdminOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
