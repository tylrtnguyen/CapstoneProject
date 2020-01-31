import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatMenuModule,MatToolbarModule,MatGridListModule, MatGridList,MatButtonModule,MatFormFieldModule, MatInputModule} from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainlandingComponent } from './mainlanding/mainlanding.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PaystubComponent } from './paystub/paystub.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    MainlandingComponent,
    DashboardComponent,
    InventoryComponent,
    ScheduleComponent,
    PaystubComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
