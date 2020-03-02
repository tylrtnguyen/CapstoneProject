import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
    selector: "ns-employee-schedule-view",
    templateUrl: "./employee-schedule-view.component.html",
    styleUrls: ["./employee-schedule-view.component.css"]
})
export class EmployeeScheduleViewComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title='Employee Name Schedule'

    Day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    Month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    employee_weekly_schedule = [
        {
            date: "Mon",
            startTime: "11:00",
            endTime: "13:00",
            hour : "2",
            earning: "500"
        },
        {
            date: "Wed",
            startTime: "11:00",
            endTime: "13:00",
            hour:"2",
            earning: "500"
        },
        {
            date: "Frid",
            startTime: "11:00",
            endTime: "13:00",
            hour:"2",
            earning: "500"
        }
    ];
    //get start day and end day of the week
    start = 0;
    today = new Date();
    day = this.today.getDay() - this.start;
    date = this.today.getDate() - this.day;
    startDate = new Date(this.today.setDate(this.date));
    endDate = new Date(this.today.setDate(this.date + 6));
    Week_begin =
        this.Month[this.startDate.getMonth() - 1] +
        "  " +
        this.startDate.getDate() +
        ", " +
        this.startDate.getFullYear();
    Week_end =
        this.Month[this.endDate.getMonth() - 1] +
        "  " +
        this.endDate.getDate() +
        ", " +
        this.endDate.getFullYear();
    // /////////////////////////////////////////////////

    constructor() {}

    work_hour=''
    earning=''
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        // this.tomorrow.setDate(this.tomorrow.getDate() + 1)
        console.log(this.today + " !!!!!!!!!!!!!!");
        this.work_hour = "Work Hour : \n 60"
        this.earning = "Earning : \n 600"
    }
}
