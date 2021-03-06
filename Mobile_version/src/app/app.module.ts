import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule  } from "nativescript-angular/forms"
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { DropDownModule } from "nativescript-drop-down/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import {ModalDialogService} from "nativescript-angular/modal-dialog";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './share-component/login/login.component';

//MANAGER COMPONENT
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { ManagerScheduleComponent } from './manager/manager-schedule/manager-schedule.component';
import { ManagerAddScheduleComponent } from './manager/manager-add-schedule/manager-add-schedule.component';
import { ManagerWorkHistoryComponent } from './manager/manager-work-history/manager-work-history.component';
import { ManagerEmployeeListComponent } from './manager/manager-employee-list/manager-employee-list.component';
import { ManagerAddEmployeeComponent } from './manager/manager-add-employee/manager-add-employee.component';
import { ProfileComponent } from './share-component/profile/profile.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeScheduleViewComponent } from './employee/employee-schedule-view/employee-schedule-view.component';
import { EmployeeSettingComponent } from './employee/employee-setting/employee-setting.component';
import { EmployeePayrollComponent } from './employee/employee-payroll/employee-payroll.component';
import { ActionBarComponent } from './share-component/action-bar/action-bar.component';
import { ManagerCalendarComponent } from './manager/manager-calendar/manager-calendar.component';
//SHARE SERVICE
import { ShareService } from "./share-services/share.service";
import { ManagerInventoryComponent } from './manager/manager-inventory/manager-inventory.component';
import { EmployeeRegistrationComponent } from './employee/employee-registration/employee-registration.component';
import { ManagerRegistrationComponent } from './manager/manager-registration/manager-registration.component';
import { ManagerTabManagerComponent } from './manager/manager-tab-manager/manager-tab-manager.component';
import { EmployeeTabManagerComponent } from './employee/employee-tab-manager/employee-tab-manager.component';
import { EmployeeInventoryComponent } from './employee/employee-inventory/employee-inventory.component';
import { EmployeeUpdateInventoryComponent } from './employee/employee-update-inventory/employee-update-inventory.component';
import { ManagerDateRangeComponent } from './manager/manager-date-range/manager-date-range.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ManagerEmployeeDetailComponent } from './manager/manager-employee-detail/manager-employee-detail.component';
import { ForgotPasswordComponent } from './share-component/forgot-password/forgot-password.component';
import { ManagerInventoryDetailComponent } from './manager/manager-inventory-detail/manager-inventory-detail.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptUIChartModule,
        AppRoutingModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule,
        DropDownModule,
        NativeScriptUIListViewModule,
        NativeScriptHttpClientModule,
        NativeScriptUIDataFormModule,
        
    ],
    declarations: [

        //Share Component
        AppComponent,
        LoginComponent,
        ProfileComponent,

        //Manager Component
        ManagerHomeComponent,
        ManagerScheduleComponent,
        ManagerAddScheduleComponent,
        ManagerWorkHistoryComponent,
        ManagerEmployeeListComponent,
        ManagerAddEmployeeComponent,

        //Employee Component
        EmployeeHomeComponent,
        EmployeeScheduleViewComponent,
        EmployeeSettingComponent,
        EmployeePayrollComponent,
        ActionBarComponent,
        ManagerCalendarComponent,
        ManagerInventoryComponent,
        EmployeeRegistrationComponent,
        ManagerRegistrationComponent,
        ManagerTabManagerComponent,
        EmployeeTabManagerComponent,
        EmployeeInventoryComponent,
        EmployeeUpdateInventoryComponent,
        ManagerDateRangeComponent,
        ManagerEmployeeDetailComponent,
        ManagerAddEmployeeComponent,
        ForgotPasswordComponent,
        ManagerInventoryDetailComponent,

        //Share Service        
    ],
    entryComponents : [ManagerAddEmployeeComponent,ForgotPasswordComponent,ManagerInventoryDetailComponent,ManagerEmployeeDetailComponent],
    providers: [ShareService,ModalDialogService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
