import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { action } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "ns-manager-schedule",
    templateUrl: "./manager-schedule.component.html",
    styleUrls: ["./manager-schedule.component.css"]
})
export class ManagerScheduleComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Schedule";
    today_schedule = [];
    num_worker = 0;
    receive_current_time($event) {
        this.today_schedule = [];
        this.share.get_EmployeeName_Schedule_by_Date(this.today_schedule,$event)
    }
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
        this.share.get_today_EmployeeName_Schedule(this.today_schedule)
        console.log(this.today_schedule.length)

    }

    
}
