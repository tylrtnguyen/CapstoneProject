import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
    selector: "ns-manager-work-history",
    templateUrl: "./manager-work-history.component.html",
    styleUrls: ["./manager-work-history.component.css"]
})
export class ManagerWorkHistoryComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Work History";
    cost: Number;
    total_hour: Number;
    selecteddate: String;
    radlist = [];
    emptylist =["Please select a date range."]
    constructor(
        public page: Page,
        public share: ShareService,
        private http: HttpClient,
        private _changeDetectionRef: ChangeDetectorRef
    ) {}

    
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.EmployeesCost();
        this.EmployeesTotalHour();
        if (
            this.selecteddate === "" ||
            this.share.dateRange === undefined
        ) {
            var today = new Date();
            this.selecteddate = today.toUTCString();
        } else {
            console.log("Test !!!")
            this.selecteddate =
                this.share.dateRange.startDate.toString().substr(0, 10) +
                this.share.dateRange.endDate.toString().substr(0, 10);
        }
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
        if (this.radlist.length == 0) {
            for (var i = 0; i < this.share.employee_info.length; i++) {
                this.radlist.push({
                    id: this.share.employee_info[i].id,
                    name: this.share.employee_info[i].name,
                    total: this.share.total_hour[i]
                });
            }
            this.EmployeesCost();
        }
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }

    EmployeesCost() {
        if (this.radlist.length == 0) {
            this.total_hour = 0;
        } else {
            for (var i = 0; i < this.radlist.length; i++) {
                this.total_hour += this.radlist[i].total;
            }
            this.EmployeesTotalHour();
        }
    }
    EmployeesTotalHour() {
        if (this.radlist.length == 0) {
            this.cost = 0;
        } else {
            const tempCost = [];
            this.http
                .get(this.share.url + "employee", {
                    headers: this.share.APIHeader()
                })
                .subscribe(result => {
                    for (var i = 0; i < result["data"].length; i++) {
                        if (result["data"][i]._id === this.radlist[i].id) {
                            tempCost.push(
                                result["data"][i].wages * this.radlist[i].total
                            );
                        }
                    }
                    const reducer = (accumulator, currentValue) =>
                        accumulator + currentValue;
                    this.cost = tempCost.reduce(reducer);
                });
        }
    }
}
