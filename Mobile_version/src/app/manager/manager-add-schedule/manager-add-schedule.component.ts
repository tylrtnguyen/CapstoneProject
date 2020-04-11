import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "../../share-services/share.service";
import * as Toast from "nativescript-toast";
import { HttpClient } from "@angular/common/http";
declare var java;
@Component({
    selector: "ns-manager-add-schedule",
    templateUrl: "./manager-add-schedule.component.html",
    styleUrls: ["./manager-add-schedule.component.css"]
})
export class ManagerAddScheduleComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    valid: Boolean;
    constructor(
        public share: ShareService,
        public router: Router,
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
        this.share.get_employee_list(this.dataItems);
    }

    //change it to get employee from database
    dataItems = [];

    employee_list_final = [];

    selected_start_time: String;
    selected_end_time: String;
    selected_date: String;

    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2045, 4, 12);
    show_datepicker: Boolean = false;
    show_start_time: Boolean = false;
    show_end_time: Boolean = false;
    show_employee_condition: Boolean = false;
    today = new Date();
    current_day = this.today.getDay();
    current_month = this.today.getMonth() + 1;
    current_year = this.today.getFullYear();
    current_hour = this.today.getHours();
    current_minute = this.today.getMinutes();
    onDateChanged(args) {
        const format_date = args.value.toString().substring(0, 15);
        this.selected_date = format_date;
    }
    show_date() {
        this.show_datepicker = !this.show_datepicker;
        this.show_start_time = false;
        this.show_end_time = false;
    }
    start_time() {
        this.show_start_time = !this.show_start_time;
        this.show_end_time = false;
        this.show_datepicker = false;
    }
    end_time() {
        this.show_end_time = !this.show_end_time;
        this.show_start_time = false;
        this.show_datepicker = false;
    }

    //get list of employee
    public onItemSelected(args: ListViewEventData) {
        // this.selected_employees.push(this.dataItems[args.index])
        let id = this.dataItems[args.index].id;
        this.employee_list_final.push(id);
    }
    public onItemDeselected(args: ListViewEventData) {
        let id = this.dataItems[args.index].id;
        this.employee_list_final = this.employee_list_final.filter(
            employee => employee != id
        );
    }
    todayObj: Date = new Date();

    onStartTimeSelected(args) {
        const time = args.value;
        const time_only = time.toString().substring(16, 24);
        this.selected_start_time = time_only;
    }
    onTimeLoad(args) {
        const timePicker = args.object;
        if (isAndroid) {
            timePicker.android.setIs24HourView(java.lang.Boolean.TRUE);
        }
    }
    onEndTimeSelected(args) {
        const tp = args.object as TimePicker;
        const time = args.value;
        const time_only = time.toString().substring(16, 24);
        this.selected_end_time = time_only;
    }
    onSubmit() {
        if (
            this.employee_list_final.length == 0 ||
            typeof this.selected_start_time === "undefined" ||
            typeof this.selected_end_time === "undefined" ||
            typeof this.selected_date === "undefined"
        ) {
            this.valid = false;
            Toast.makeText("Please assign all information needed").show();
        } else {
            this.valid = true;
            this.share.selected_work_date = this.selected_date;

            for (var i = 0; i < this.employee_list_final.length; i++) {
                this.http
                    .post(
                        this.share.url + "schedule",
                        {
                            workDays: [
                                {
                                    date: this.selected_date,
                                    assignedStartHour: this.selected_start_time.substr(
                                        0,
                                        2
                                    ),
                                    assignedStopHour: this.selected_end_time.substr(
                                        0,
                                        2
                                    )
                                }
                            ],
                            employee: this.employee_list_final[i]
                        },
                        { headers: this.share.APIHeader() }
                    )
                    .subscribe(
                        result => {
                        },
                        error =>
                            Toast.makeText(
                                "An employee has already work this day, please don't overwork your employee",
                                "short"
                            )
                    );
            }

            this.router.navigateByUrl("/manager-schedule");
        }
    }
}
