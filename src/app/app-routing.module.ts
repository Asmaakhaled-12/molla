import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './account/components/edit-profile/edit-profile.component';
import { LoginComponent } from './account/components/login/login.component';
import { ProfileComponent } from './account/components/profile/profile.component';
import { RegisterComponent } from './account/components/register/register.component';
import { AuthGuardService } from './account/services/auth-gurad.service';
import { AuthRoleGuardGuard } from './account/services/auth-role-guard.guard';

import { AddCategoryComponent } from './category/compenents/add-category/add-category.component';
import { CategoryDataTableComponent } from './category/compenents/category-data-table/category-data-table.component';
import { CategoryDetailsComponent } from './category/compenents/category-details/category-details.component';
import { EditCategoryComponent } from './category/compenents/edit-category/edit-category.component';
import { CheckoutComponent } from './checkout/components/checkout/checkout.component';
import { AdminOrderDetailsComponent } from './orders/Components/admin-order-details/admin-order-details.component';
import { AdminOrdersComponent } from './orders/Components/admin-orders/admin-orders.component';
import { AboutUsComponent } from './Shared/about-us/about-us.component';
import { ContactUsComponent } from './Shared/contact-us/contact-us.component';
import { HomeComponent } from './Shared/home/home.component';
import { ShopComponent } from './Shared/shop/shop.component';

const routes: Routes =
 [
   {path:"", redirectTo:"home", pathMatch:"full"},
   {path:"home",component:HomeComponent},
   {path:"about",component:AboutUsComponent},
   {path:"contact",component:ContactUsComponent},
  {path: 'basket',loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)},
  {path: 'checkout',loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),canActivate:[AuthGuardService]},
  {path:"shop",component:ShopComponent},
   {path:"addNewCategory",component:AddCategoryComponent},
   {path:"editCategory/:id",component:EditCategoryComponent},
   {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"editprofile",component:EditProfileComponent},
  {path:"login",component:LoginComponent},
  {path:"orders",loadChildren:()=>import('./orders/orders.module').then(ord=>ord.OrdersModule)},
  {path:"orderAdmin",component:AdminOrdersComponent},
  {path:"orderAdmin/AdminDetailsOrder/:id",component:AdminOrderDetailsComponent},
  {path:"products",loadChildren:()=>import('./product/product.module').then(p=>p.ProductModule)},
  {path:"categories",component:CategoryDataTableComponent,canActivate:[AuthGuardService,AuthRoleGuardGuard],
  data:{
    role:"Admin"
  }},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
