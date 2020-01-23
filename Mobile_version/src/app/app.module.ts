import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule  } from "nativescript-angular/forms"
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { DropDownModule } from "nativescript-drop-down/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './share-component/login/login.component';
import { WelcomeComponent } from './share-component/welcome/welcome.component';

//MANAGER COMPONENT
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { ManagerScheduleComponent } from './manager/manager-schedule/manager-schedule.component';
import { ManagerAddScheduleComponent } from './manager/manager-add-schedule/manager-add-schedule.component';
import { ManagerWorkHistoryComponent } from './manager/manager-work-history/manager-work-history.component';
import { ManagerEmployeeListComponent } from './manager/manager-employee-list/manager-employee-list.component';
import { ManagerAddEmployeeComponent } from './manager/manager-add-employee/manager-add-employee.component';
import { ManagerSettingsComponent } from './manager/manager-settings/manager-settings.component';
import { ManagerWorkHistoryDetailComponent } from './manager/manager-work-history-detail/manager-work-history-detail.component';
import { ProfileComponent } from './share-component/profile/profile.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeScheduleViewComponent } from './employee/employee-schedule-view/employee-schedule-view.component';
import { InventoryComponent } from './share-component/inventory/inventory.component';
import { EmployeeSettingComponent } from './employee/employee-setting/employee-setting.component';
import { EmployeePayrollComponent } from './employee/employee-payroll/employee-payroll.component';
import { ActionBarComponent } from './share-component/action-bar/action-bar.component';
import { ManagerCalendarComponent } from './manager/manager-calendar/manager-calendar.component';
//SHARE SERVICE
import { ShareService } from "./share-services/share.service";


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule,
        DropDownModule,
        NativeScriptUIListViewModule
    ],
    declarations: [

        //Share Component
        AppComponent,
        LoginComponent,
        WelcomeComponent,
        ProfileComponent,
        InventoryComponent,

        //Manager Component
        ManagerHomeComponent,
        ManagerScheduleComponent,
        ManagerAddScheduleComponent,
        ManagerWorkHistoryComponent,
        ManagerEmployeeListComponent,
        ManagerAddEmployeeComponent,
        ManagerSettingsComponent,
        ManagerWorkHistoryDetailComponent,

        //Employee Component
        EmployeeHomeComponent,
        EmployeeScheduleViewComponent,
        EmployeeSettingComponent,
        EmployeePayrollComponent,
        ActionBarComponent,
        ManagerCalendarComponent,
        

        //Share Service        
    ],
    providers: [ShareService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
