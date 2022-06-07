import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDataTableComponent } from './compenents/category-data-table/category-data-table.component';

const routes: Routes = 
[
 //{path:"",component:CategoryDataTableComponent},
// {path:"all",component:cate}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
