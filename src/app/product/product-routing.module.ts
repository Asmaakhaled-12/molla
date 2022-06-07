import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../account/services/auth-gurad.service';
import { AuthRoleGuardGuard } from '../account/services/auth-role-guard.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {path:"",component:ProductListComponent},
  {path:"add",component:AddProductComponent,canActivate:[AuthGuardService,AuthRoleGuardGuard],
  data:{
    role:"Admin"
  }},
  {path:"edit/:id",component:EditProductComponent,canActivate:[AuthGuardService,AuthRoleGuardGuard],
  data:{
    role:"Admin"
  }},
  {path:"delete/:id",component:DeleteProductComponent,canActivate:[AuthGuardService,AuthRoleGuardGuard],
  data:{
    role:"Admin"
  }},
  {path:"details/:id",component:ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
