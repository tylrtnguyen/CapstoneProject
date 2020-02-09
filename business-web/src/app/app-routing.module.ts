import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainlandingComponent } from './features/mainlanding/mainlanding.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { PaystubComponent } from './features/paystub/paystub.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TrialPageComponent } from './trial-page/trial-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [

  {path: 'main', component: MainPageComponent},
  {path: 'guestTrial', component: TrialPageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'checkout' , component:CheckoutComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
