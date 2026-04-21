import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { ProductComponent } from './product/product.component';
import { CardioComponent } from './cardio/cardio.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

import { GymComponent } from './gym/gym.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Welcome1Component } from './welcome1/welcome1.component';
import { Welcome2Component } from './welcome2/welcome2.component';
import { Welcome3Component } from './welcome3/welcome3.component';
import { Welcome4Component } from './welcome4/welcome4.component';
import { RejectPageComponent } from './reject-page/reject-page.component';
import { SigninRejectComponent } from './signin-reject/signin-reject.component';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { WithoutLoginComponent } from './without-login/without-login.component';
import { ShipmentCodeComponent } from './shipment-code/shipment-code.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { MyorderComponent } from './myorder/myorder.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    component: HomeComponent
  },
   {
    path: 'detailproduct/:id',
    component: DetailproductComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cardio',
    component: CardioComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  
  {
    path: 'gym',
    component: GymComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'welcome1',
    component: Welcome1Component
  },
  {
    path: 'welcome2',
    component: Welcome2Component
  },
  {
    path: 'welcome3',
    component: Welcome3Component
  },
  {
    path: 'welcome4',
    component: Welcome4Component
  },
  {
    path: 'reject-page',
    component: RejectPageComponent
  },
  {
   path: 'signin-reject',
   component: SigninRejectComponent
  },
  {
    path: 'porfolio',
    component: PorfolioComponent
  },
  {
   path: 'without-login',
   component: WithoutLoginComponent
  },
  {
   path: 'shipment-code',
   component: ShipmentCodeComponent
  },
  {
    path: 'payment-mode',
    component: PaymentModeComponent
  },
  {
     path: 'myorder',
     component: MyorderComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
