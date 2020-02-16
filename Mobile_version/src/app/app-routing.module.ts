import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./share-component/login/login.component";
import { WelcomeComponent } from "./share-component/welcome/welcome.component";
import { ManagerHomeComponent } from "./manager/manager-home/manager-home.component";
import { ManagerScheduleComponent } from "./manager/manager-schedule/manager-schedule.component";
import { EmployeeHomeComponent } from "./employee/employee-home/employee-home.component";
import { EmployeeScheduleViewComponent } from "./employee/employee-schedule-view/employee-schedule-view.component";
import { ManagerWorkHistoryComponent } from "./manager/manager-work-history/manager-work-history.component";
import { ManagerEmployeeListComponent } from "./manager/manager-employee-list/manager-employee-list.component";
import { ManagerInventoryComponent } from "./manager/manager-inventory/manager-inventory.component";
import { ManagerAddScheduleComponent } from "./manager/manager-add-schedule/manager-add-schedule.component";
import { RegistrationComponent } from "./share-component/registration/registration.component";
import { EmployeeRegistrationComponent } from "./employee/employee-registration/employee-registration.component";
import { ManagerRegistrationComponent } from "./manager/manager-registration/manager-registration.component";
import { ManagerTabManagerComponent } from "./manager/manager-tab-manager/manager-tab-manager.component";
import { EmployeeInventoryComponent } from "./employee/employee-inventory/employee-inventory.component";
import { EmployeeProfileComponent } from "./employee/employee-profile/employee-profile.component";
import { EmployeePayrollComponent } from "./employee/employee-payroll/employee-payroll.component";
import { EmployeeUpdateInventoryComponent } from "./employee/employee-update-inventory/employee-update-inventory.component";
import { ManagerDateRangeComponent } from "./manager/manager-date-range/manager-date-range.component";
// import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/welcome", pathMatch: "full" },
    { path: "welcome", component: WelcomeComponent },
    { path: "login", component: LoginComponent },
    { path: "manager-home", component: ManagerHomeComponent },
    { path: "manager-tab", component: ManagerTabManagerComponent },
    { path: "manager-schedule", component: ManagerScheduleComponent},
    { path: "manager-work-history", component: ManagerWorkHistoryComponent },
    { path: "manager-inventory", component: ManagerInventoryComponent},
    { path: "manager-employee-list", component: ManagerEmployeeListComponent },
    { path: "manager-add-schedule", component: ManagerAddScheduleComponent },
    { path: "manager-date-range", component: ManagerDateRangeComponent},
    { path: "manager-registration", component: ManagerRegistrationComponent},

    { path: "employee-home", component: EmployeeHomeComponent},
    { path: "employee-schedule", component: EmployeeScheduleViewComponent},
    { path: "registration", component: RegistrationComponent},
    { path: "employee-registration", component: EmployeeRegistrationComponent},
    { path: "employee-inventory", component: EmployeeInventoryComponent},
    { path: "employee-profile", component: EmployeeProfileComponent},
    { path: "employee-payroll", component: EmployeePayrollComponent},
    { path: "employee-update-inventory", component: EmployeeUpdateInventoryComponent},
   

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
