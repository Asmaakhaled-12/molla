import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { HomeComponent } from './Shared/home/home.component';
import { AboutUsComponent } from './Shared/about-us/about-us.component';
import { ContactUsComponent } from './Shared/contact-us/contact-us.component';
import { CategoryModule } from './category/category.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './category/compenents/add-category/add-category.component';
import { EditCategoryComponent } from './category/compenents/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './category/compenents/category-details/category-details.component';
import { ShopComponent } from './Shared/shop/shop.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './account/components/register/register.component';
import { LoginComponent } from './account/components/login/login.component';
import { ProfileComponent } from './account/components/profile/profile.component';
import { EditProfileComponent } from './account/components/edit-profile/edit-profile.component';
import { SharedModule } from './Shared/shared.module';
import { AuthGuardService } from './account/services/auth-gurad.service';
import { CheckoutComponent } from './checkout/components/checkout/checkout.component';
import { CheckoutPaymentComponent } from './checkout/components/checkout-payment/checkout-payment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CheckoutRoutingModule } from './checkout/checkout-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ShopComponent,
    FilterPipe,
RegisterComponent,
LoginComponent,
ProfileComponent,
EditProfileComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CategoryModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule,
    SharedModule,
 
    CheckoutRoutingModule,
   
    MatStepperModule,
    MatButtonModule,
    
   
  ]

  ,
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddCategoryComponent,EditCategoryComponent,CategoryDetailsComponent]
})
export class AppModule { }
