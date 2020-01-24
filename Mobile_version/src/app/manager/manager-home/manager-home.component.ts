import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// import { ActionBarComponent } from "~/app/share-component/action-bar/action-bar.component";

@Component({
    selector: "ns-manager-home",
    templateUrl: "./manager-home.component.html",
    styleUrls: ["./manager-home.component.css"]
})
export class ManagerHomeComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}

    schedule() {
        this.router.navigateByUrl("/manager-schedule");
    }
    work_history() {
        this.router.navigateByUrl("/manager-work-history");
    }
    inventory() {
        this.router.navigateByUrl("/manager-inventory");
    }
    employee() {
        this.router.navigateByUrl("/manager-employee-list");
    }
}
