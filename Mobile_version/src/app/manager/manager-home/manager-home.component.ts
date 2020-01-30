import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

// import { ActionBarComponent } from "~/app/share-component/action-bar/action-bar.component";

@Component({
    selector: "ns-manager-home",
    templateUrl: "./manager-home.component.html",
    styleUrls: ["./manager-home.component.css"]
})
export class ManagerHomeComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    constructor(public router: Router, public page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
    }

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
