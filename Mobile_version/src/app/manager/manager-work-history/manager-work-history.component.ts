import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "ns-manager-work-history",
    templateUrl: "./manager-work-history.component.html",
    styleUrls: ["./manager-work-history.component.css"]
})
export class ManagerWorkHistoryComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Work History";
    constructor(public page: Page, public share: ShareService, private http: HttpClient) {}
    selected_date_range = "Sat Feb 15 2019";

    work_history = [
        {
            name: "Thanh Quan",
            position: "Server",
            work_hour: "40 hours",
            total_earning: "117$",
            date: "Sat Feb 15 2019"
        },
        {
            name: "Tu Quan",
            position: "Server",
            work_hour: "40 hours",
            total_earning: "117$",
            date: "Sat Feb 15 2019"
        },
        {
            name: "Quang Quan",
            position: "Server",
            work_hour: "40 hours",
            total_earning: "117$",
            date: "Sat Feb 15 2019"
        },
        {
            name: "Thong Quan",
            position: "Server",
            work_hour: "40 hours",
            total_earning: "117$",
            date: "Sat Feb 15 2019"
        }
    ];
    ngOnInit() {
       
        if (typeof this.share.dateRange !== "undefined") {
            console.log(
                `Start searching from ${this.share.dateRange.startDate} to ${this.share.dateRange.endDate}`
            );
        }
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
    }
}
