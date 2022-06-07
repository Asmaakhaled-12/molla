import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    BasketComponent,

  ],
  imports: [
    CommonModule,
    BasketRoutingModule, MatIconModule ,MatButtonModule,SharedModule]
})
export class BasketModule { }
