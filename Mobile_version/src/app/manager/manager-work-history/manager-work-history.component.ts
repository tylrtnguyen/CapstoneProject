import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
@Component({
    selector: "ns-manager-work-history",
    templateUrl: "./manager-work-history.component.html",
    styleUrls: ["./manager-work-history.component.css"]
})
export class ManagerWorkHistoryComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    constructor(public page: Page) {
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
}
