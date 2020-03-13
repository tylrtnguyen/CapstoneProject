import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainlandingComponent } from './components/features/mainlanding/mainlanding.component';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { InventoryComponent } from './components/features/inventory/inventory.component';
import { ScheduleComponent } from './components/features/schedule/schedule.component';
import { PaystubComponent } from './components/features/paystub/paystub.component';
import { ContactUsComponent } from './components/features/contact-us/contact-us.component';
import { NavbarComponent } from './components/features/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TrialPageComponent } from './components/trial-page/trial-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  {path: 'main', component: MainPageComponent},
  {path: 'signup', component: TrialPageComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'login', component:LoginComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
