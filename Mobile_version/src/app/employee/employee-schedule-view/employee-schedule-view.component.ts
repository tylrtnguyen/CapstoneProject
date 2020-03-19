import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "ns-employee-schedule-view",
    templateUrl: "./employee-schedule-view.component.html",
    styleUrls: ["./employee-schedule-view.component.css"]
})
export class EmployeeScheduleViewComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Schedule";
    employee_weekly_schedule = [];
    firstday;
    lastday;

    constructor(private share: ShareService, private http: HttpClient) {}
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.firstday = this.share.numDayinWeek()[0].toString().substr(0,15);
        this.lastday = this.share.numDayinWeek()[1].toString().substr(0,15);
        this.share.get_employee_schedule_by_week(this.employee_weekly_schedule)
    }
}
