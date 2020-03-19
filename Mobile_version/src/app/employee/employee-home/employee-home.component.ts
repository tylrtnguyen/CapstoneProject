import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "ns-employee-home",
    templateUrl: "./employee-home.component.html",
    styleUrls: ["./employee-home.component.css"]
})
export class EmployeeHomeComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    status: Boolean = false;
    title = "Home Page";
    schedule = [];
    constructor(
        public router: Router,
        public page: Page,
        public share: ShareService,
        public http: HttpClient
    ) {}

    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.share.get_current_user_schedule("5e7292840f25ad00176c5c9c");
      
    }

}
