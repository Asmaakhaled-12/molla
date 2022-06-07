import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalPricePipe } from '../pipes/total-price.pipe';
import { MultiplicationPipe } from '../pipes/multiplication.pipe';
import { TotalPriceIncludingShippingPipe } from '../pipes/total-price-including-shipping.pipe';




@NgModule({
  declarations: [TotalPricePipe,MultiplicationPipe,TotalPriceIncludingShippingPipe],
  imports: [
     CommonModule,
    // BrowserModule
  ],
  exports:[TotalPricePipe,MultiplicationPipe,TotalPriceIncludingShippingPipe]
})
export class SharedModule { }
