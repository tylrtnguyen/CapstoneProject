import { Component, OnInit, Injectable, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { CalendarSelectionMode, DateRange } from "nativescript-ui-calendar";
import * as applicationModule from "tns-core-modules/application";
import { RadCalendarComponent } from "nativescript-ui-calendar/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import * as Toast from "nativescript-toast";

@Component({
    selector: "ns-manager-date-range",
    templateUrl: "./manager-date-range.component.html",
    styleUrls: ["./manager-date-range.component.css"]
})
export class ManagerDateRangeComponent implements OnInit {
    constructor(
        private routerExtensions: RouterExtensions,
        private page: Page,
        public share: ShareService,
        public router: Router
    ) {}
    @ViewChild("myCalendar", { static: false }) _calendar: RadCalendarComponent;
    ifAndroid: Boolean;
    ifIOS: Boolean;
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.page.actionBarHidden = true;
    }
    get selectionMode() {
        return CalendarSelectionMode.Range;
    }
    onSubmit() {
        if (
            this._calendar.nativeElement.selectedDateRange === undefined
        ) { Toast.makeText("Please select a date range","short")
        } else {
            let firstSelectedDate = this._calendar.nativeElement
                .selectedDateRange.startDate;
            let lastSelectedDate = this._calendar.nativeElement
                .selectedDateRange.endDate;
            let dateRange = (this._calendar.nativeElement.selectedDateRange = new DateRange(
                firstSelectedDate,
                lastSelectedDate
            ));
            console.log("you have selected a date range of : " + dateRange);
            this.share.dateRange = dateRange;
            const total_hour = [];
            const employee_list = [];
            this.share.getTotaWageslbyDateRage(
                this.share.dateRange.startDate,
                this.share.dateRange.endDate,
                total_hour
            );
            this.share.get_employee_list(employee_list);
            this.share.total_hour = total_hour;
            this.share.employee_info = employee_list;
            this.router.navigateByUrl("/manager-work-history");
        }
    }

    goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}
