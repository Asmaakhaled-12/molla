import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../account/services/auth-gurad.service';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes =
[
  {path:"",component:CheckoutComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
