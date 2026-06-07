import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { ProductComponent } from './product/product.component';
import { CardioComponent } from './cardio/cardio.component';
import { CartComponent } from './cart/cart.component';


import { GymComponent } from './gym/gym.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './welcome/welcome.component';
import { Welcome1Component } from './welcome1/welcome1.component';
import { Welcome2Component } from './welcome2/welcome2.component';
import { Welcome3Component } from './welcome3/welcome3.component';
import { Welcome4Component } from './welcome4/welcome4.component';
import { RejectPageComponent } from './reject-page/reject-page.component';
import { SigninRejectComponent } from './signin-reject/signin-reject.component';

import { FormsModule } from '@angular/forms';
import { WithoutLoginComponent } from './without-login/without-login.component';
import { ShipmentCodeComponent } from './shipment-code/shipment-code.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    Page404Component,
    DetailproductComponent,
    ProductComponent,
    CardioComponent,
    CartComponent,
   
    
    GymComponent,
    LoginComponent,
    WelcomeComponent,
    Welcome1Component,
    Welcome2Component,
    Welcome3Component,
    Welcome4Component,
    RejectPageComponent,
    SigninRejectComponent,
   
    WithoutLoginComponent,
    ShipmentCodeComponent,
    PaymentModeComponent,
    MyorderComponent,
    ProfileComponent
    
    
    
    
    
  ],
  imports: [
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true
    }),
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
