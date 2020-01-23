import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./share-component/login/login.component";
import { WelcomeComponent } from "./share-component/welcome/welcome.component";
import { EmployeeBottomNavigationComponent } from "./employee/employee-bottom-navigation/employee-bottom-navigation.component";
import { ManagerHomeComponent } from "./manager/manager-home/manager-home.component";
import { ManagerScheduleComponent } from "./manager/manager-schedule/manager-schedule.component";
// import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/welcome", pathMatch: "full" },
    { path: "welcome", component: WelcomeComponent },
    { path: "login", component: LoginComponent },
    { path: "manager-home", component: ManagerHomeComponent },
    { path: "employee-home", component: EmployeeBottomNavigationComponent},
    { path: "manager-schedule", component: ManagerScheduleComponent},
    // { path: "manager-schedule", component:}
    // { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
