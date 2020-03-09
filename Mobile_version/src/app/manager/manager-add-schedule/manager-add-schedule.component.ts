import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "../../share-services/share.service";
import * as Toast from "nativescript-toast";
declare var java;
@Component({
    selector: "ns-manager-add-schedule",
    templateUrl: "./manager-add-schedule.component.html",
    styleUrls: ["./manager-add-schedule.component.css"]
})
export class ManagerAddScheduleComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    valid : Boolean;
    constructor(public share: ShareService, public router: Router) {}

    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
    }

    //change it to get employee from database
    dataItems = [
        {
            //http get employee id from Schedule databse then http get employee firstName lastName from Employee database.
            name: "Thanh Quan",
            //htttp get from schedule
            start_time: "15:00",
            end_time: "17:00",
            position: "Manager",
            date: "Tuesday 21 1 2020"
        },
        {
            name: "Thay Ba",
            start_time: "15:00",
            end_time: "17:00",
            position: "Manager",
            date: "Wednesday 22 1 2020"
        },
        {
            name: "Tu Nguyen",
            start_time: "15:00",
            end_time: "17:00",
            position: "Janitor",
            date: "Tuesday 21 1 2020"
        },
        {
            name: "Thanh Dep Trai",
            start_time: "15:00",
            end_time: "17:00",
            position: "CEO",
            date: "Wednesday 22 1 2020"
        },
        {
            name: "Quang Pham",
            start_time: "15:00",
            end_time: "17:00",
            position: "Striper 1",
            date: "Wednesday 22 1 2020"
        },
        {
            name: "Thong Nguyen",
            start_time: "15:00",
            end_time: "17:00",
            position: "Striper 2",
            date: "Wednesday 22 1 2020"
        }
    ];

    temp_selected_employees = [];
    selected_employees_final = [];
    selected_start_date: String;
    selected_end_date: String;
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

    onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }
    onDateChanged(args) {
        const format_date = args.value.toString().substring(0, 15);
        console.log(format_date);
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

    public onItemSelected(args: ListViewEventData) {
        // this.selected_employees.push(this.dataItems[args.index])
        let name = this.dataItems[args.index].name;
        this.temp_selected_employees.push(name);
    }
    public onItemDeselected(args: ListViewEventData) {
        let name = this.dataItems[args.index].name;
        this.temp_selected_employees = this.temp_selected_employees.filter(
            employee => employee != name
        );
    }
    todayObj: Date = new Date();

    onStartTimeSelected(args) {
        const time = args.value;
        const time_only = time.toString().substring(16, 24);
        this.selected_start_date = time_only;
        // console.log(`Chosen start time: ${time.substring(4,9)}`);
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
        this.selected_end_date = time_only;
        // console.log(`Chosen end time: ${time}`);
    }
    onSubmit() {
        if (
            this.selected_employees_final.length == 0 &&
            typeof this.selected_start_date === "undefined" &&
            typeof this.selected_end_date === "undefined" &&
            typeof this.selected_date === "undefined"
        ) {
            this.valid = false;
            Toast.makeText(
                "Please assign all information needed"
            ).show();

        } else {
            this.valid = true;

            this.selected_employees_final = this.temp_selected_employees;
            this.share.selected_work_date = this.selected_date;
            console.log(
                `Employees : ${this.selected_employees_final} is start working from ${this.selected_start_date} to ${this.selected_end_date} on this date ${this.selected_date} `
            );
            //change this to schedule database
            const schedule = {
                nameList: this.selected_employees_final,
                start_time: this.selected_start_date,
                end_time: this.selected_end_date,
                date: this.selected_date
            };
            this.share.add_work_schedule(schedule);
            this.router.navigateByUrl("/manager-schedule");
        }
    }
}
