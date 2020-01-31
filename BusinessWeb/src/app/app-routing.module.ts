import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainlandingComponent } from './mainlanding/mainlanding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PaystubComponent } from './paystub/paystub.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [

  {path: 'main', component: MainPageComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
