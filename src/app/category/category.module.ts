import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailsComponent } from './compenents/category-details/category-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { AddCategoryComponent } from './compenents/add-category/add-category.component';
import { EditCategoryComponent } from './compenents/edit-category/edit-category.component';
import { CategoryDataTableComponent } from './compenents/category-data-table/category-data-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    CategoryDetailsComponent,
    SearchPipe,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryDataTableComponent,
  ],
  imports: [
    CommonModule,
   CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports:[
    CategoryDetailsComponent,
    SearchPipe,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryDataTableComponent,]
})
export class CategoryModule { }
