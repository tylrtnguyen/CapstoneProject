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
    selected_date: string;
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Schedule";
    today_schedule = [];
    temp_dataItems = [];
    receive_current_time($event) {
        this.selected_date = $event;
        this.today_schedule = [];
        this.filter();
    }

    filter() {
        const tempdate = new Date(this.selected_date);
        const date = tempdate.toISOString().substr(0, 10);
        this.http
            .get(this.share.url + "schedule", {
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    const schedule = result["data"];
                    for (var i = 0; i < schedule.length; i++) {
                        const today_employee = schedule[i].employee;
                        const today_workTime = schedule[i].workDays;
                        const today_date = schedule[i].workDays[0].date.substr(
                            0,
                            10
                        );
                        if (today_date === date) {
                            this.http
                                .get(
                                    this.share.url +
                                        `employee/${today_employee}`,
                                    { headers: this.share.APIHeader() }
                                )
                                .subscribe(
                                    result => {
                                        this.today_schedule.push({
                                            name:
                                                result["data"].fName +
                                                result["data"].lName,
                                            startTime:
                                                today_workTime[0]
                                                    .assignedStartHour,
                                            endTime:
                                                today_workTime[0]
                                                    .assignedStopHour,
                                            selectedDate: today_date
                                        });
                                        console.log("Show Result" + JSON.stringify(this.today_schedule))
                                    },
                                    error => console.log(error)
                                );
                        } else {
                        }
                    }
                },
                error => console.log(error)
            );
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
        this.http
            .get(this.share.url + "schedule", {
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    const date = new Date();
                    const schedule = result["data"];
                    var systemDate = date.toISOString().substr(0, 10);
                    for (var i = 0; i < schedule.length; i++) {
                        const today_employee = schedule[i].employee;
                        const today_workTime = schedule[i].workDays;
                        const today_date = schedule[i].workDays[0].date.substr(
                            0,
                            10
                        );
                        if (today_date === systemDate) {
                            this.http
                                .get(
                                    this.share.url +
                                        `employee/${today_employee}`,
                                    { headers: this.share.APIHeader() }
                                )
                                .subscribe(
                                    result => {
                                        this.today_schedule.push({
                                            name:
                                                result["data"].fName +
                                                result["data"].lName,
                                            startTime:
                                                today_workTime[0]
                                                    .assignedStartHour,
                                            endTime:
                                                today_workTime[0]
                                                    .assignedStopHour,
                                            selectedDate: today_date
                                        });
                                        console.log(this.today_schedule);
                                    },
                                    error => console.log(error)
                                );
                        } else {
                        }
                    }
                },
                error => console.log(error)
            );
    }
}
