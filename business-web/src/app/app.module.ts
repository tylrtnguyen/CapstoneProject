import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatProgressSpinnerModule, MatMenuModule , MatDialogModule ,MatCardModule,MatListModule,MatToolbarModule, MatGridListModule, MatGridList, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatIcon, MatList, MatSelectModule, MatStepperModule } from '@angular/material';

import { IgxIconModule, IgxInputGroupModule, IgxButtonModule, IgxRippleModule, IgxDatePickerModule, IgxTimePickerModule, IgxComboModule, IgxSelectModule, IgxToggleModule, IgxLayoutModule } from "igniteui-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainlandingComponent } from './components/features/mainlanding/mainlanding.component';
import { DashboardComponent } from './components/features/dashboard/dashboard.component';
import { InventoryComponent } from './components/features/inventory/inventory.component';
import { ScheduleComponent } from './components/features/schedule/schedule.component';
import { PaystubComponent } from './components/features/paystub/paystub.component';
import { ContactUsComponent } from './components/features/contact-us/contact-us.component';
import { NavbarComponent } from './components/features/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TrialPageComponent } from './components/trial-page/trial-page.component';
import { PaymentHandlerComponent } from './components/payment-handler/payment-handler.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import {ManagerService} from './services/Manager/manager.service';
import { ErrorInterceptor } from './error-interceptor';
import { PricingComponent } from './components/pricing/pricing.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


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
    TrialPageComponent,
    PaymentHandlerComponent,
    CheckoutComponent,
    LoginComponent,

    PricingComponent,

    NotFoundPageComponent,



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
    MatListModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
    MatStepperModule,
    FormsModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxDatePickerModule,
    IgxTimePickerModule,
    IgxComboModule,
    IgxSelectModule,
    ReactiveFormsModule,
    IgxToggleModule,
    IgxLayoutModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule


  ],
  providers: [ManagerService, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
