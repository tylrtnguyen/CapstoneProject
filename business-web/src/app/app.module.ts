import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import {MatMenuModule,MatToolbarModule,MatGridListModule, MatGridList,MatButtonModule,MatFormFieldModule, MatInputModule,MatIconModule, MatIcon} from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainlandingComponent } from './features/mainlanding/mainlanding.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { PaystubComponent } from './features/paystub/paystub.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TrialPageComponent } from './trial-page/trial-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainlandingComponent,
    DashboardComponent,
    InventoryComponent,
    ScheduleComponent,
    PaystubComponent,
    ContactUsComponent,
    NavbarComponent,
    MainPageComponent,
    TrialPageComponent
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
    NgbModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
