import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Employee } from "../model/Employee";
import { DateRange } from "nativescript-ui-calendar";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { confirm } from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";

@Injectable({
    providedIn: "root"
})
export class ShareService {
    constructor(
        private http: HttpClient,
        public router: Router,
        public modal: ModalDialogService
    ) {}

    //back button
    dateRange: DateRange;
    currentUser;
    currentUserSchedule;
    clockinTime: String;
    clockoutTime: String;
    isLogin = false;
    selected_work_date: String;
    url = `https://restaskest84.appspot.com/api/`;
    urlLoginManager = `https://restaskest84.appspot.com/login/manager`;
    urlLoginEmployee = `https://restaskest84.appspot.com/login/employee`;
    today_workers: number;
    employee_info = [];
    total_hour = [];
    Logout() {
        this.isLogin = !this.isLogin;
    }

    APIHeader() {
        var token = {
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzUzNTUxN2U0MGI1NTk3MTIyMCIsImlhdCI6MTU4NTE3NjI4NSwiZXhwIjoxNTg1MTc5ODg1fQ.yfREcE3gVwgX2SfLSyZXLIt45ug8IGTTM44AMkgdMGo"
        };
        let header = new HttpHeaders({
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json"
        });
        return header;
    }

    numDayinWeek() {
        var start = 0;
        var today = new Date();
        var day = today.getDay() - start;
        var date = today.getDate() - day;
        var Week_begin = new Date(today.setDate(date));
        var Week_end = new Date(today.setDate(date + 6));
        return [Week_begin, Week_end];
    }
    get_employee_list(list) {
        this.http
            .get(this.url + "employee", { headers: this.APIHeader() })
            .subscribe(
                result => {
                    result["data"].map(key => {
                        list.push({
                            id: key._id,
                            name: key.fName + " " + key.lName
                        });
                    });
                },
                error => console.log(error)
            );
    }

    //get the schedule for this specific employee
    get_employee_schedule_by_week(list) {
        this.http
            .get(this.url + "schedule", {
                headers: this.APIHeader()
            })
            .subscribe(
                result => {
                    const employee_schedule = result["data"].filter(
                        key => key.employee === this.currentUser.userId
                    );
                    for (var i = 0; i < employee_schedule.length; i++) {
                        const currentDate = new Date(
                            employee_schedule[i].workDays[0].date
                        );
                        if (
                            currentDate > this.numDayinWeek()[0] &&
                            currentDate < this.numDayinWeek()[1]
                        ) {
                            list.push({
                                date: employee_schedule[i].workDays[0].date,
                                startTime:
                                    employee_schedule[i].workDays[0]
                                        .assignedStartHour,
                                endTime:
                                    employee_schedule[i].workDays[0]
                                        .assignedStopHour
                            });
                        }
                    }
                },
                error => console.log(error)
            );
    }

    //get the list of employee schedule for today only
    getEmployeeName_baseon_Schedule(list, num_worker = 0) {
        this.http
            .get(this.url + "schedule", {
                headers: this.APIHeader()
            })
            .subscribe(
                result => {
                    const date = new Date();
                    const schedule = result["data"];
                    var systemDate = date.toISOString().substr(0, 10);
                    for (var i = 0; i < schedule.length; i++) {
                        const today_employee = schedule[i].employee;
                        const today = schedule[i].workDays[0].date.substr(
                            0,
                            10
                        );

                        if (today === systemDate) {
                            this.http
                                .get(this.url + `employee/${today_employee}`, {
                                    headers: this.APIHeader()
                                })
                                .subscribe(
                                    result => {
                                        list.push(result["data"]);
                                        num_worker = list.length;
                                    },
                                    error => console.log(error)
                                );
                        } else {
                            num_worker = 0;
                        }
                    }
                },
                error => console.log(error)
            );
    }

    //get Employee name and schedule base on today
    get_today_EmployeeName_Schedule(list) {
        this.http
            .get(this.url + "schedule", {
                headers: this.APIHeader()
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
                                .get(this.url + `employee/${today_employee}`, {
                                    headers: this.APIHeader()
                                })
                                .subscribe(
                                    result => {
                                        list.push({
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

    get_EmployeeName_Schedule_by_Date(list, selected_date) {
        const tempdate = new Date(selected_date);
        const date = tempdate.toISOString().substr(0, 10);
        this.http
            .get(this.url + "schedule", {
                headers: this.APIHeader()
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
                                .get(this.url + `employee/${today_employee}`, {
                                    headers: this.APIHeader()
                                })
                                .subscribe(
                                    result => {
                                        list.push({
                                            name:
                                                result["data"].fName +
                                                " \t " +
                                                result["data"].lName,
                                            startTime:
                                                today_workTime[0]
                                                    .assignedStartHour,
                                            endTime:
                                                today_workTime[0]
                                                    .assignedStopHour,
                                            selectedDate: today_date
                                        });
                                        this.today_workers = list.length;
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

    get_current_user_schedule(userID) {
        if (userID == undefined) {
            console.log("Fail");
            this.currentUserSchedule = false;
        } else {
            this.http
                .get(this.url + "schedule", { headers: this.APIHeader() })
                .subscribe(result => {
                    const tempdate = new Date();
                    const date = tempdate.toISOString().substr(0, 10);
                    console.log(date);
                    this.currentUserSchedule = result["data"].filter(
                        key =>
                            key.employee === userID &&
                            key.workDays[0].date.substr(0, 10) === date
                    );
                });
        }
    }

    clockInChecker() {
        if (this.currentUserSchedule.length === 0) {
        } else {
            var inHour = this.currentUserSchedule[0].workDays[0].inHour;
            console.log(inHour);
            if (inHour === "" || inHour == undefined) {
                this.clockin();
            } else {
                let options = {
                    title: "Already Clocked in",
                    okButtonText: "Got it"
                };

                confirm(options).then((result: boolean) => {});
            }
        }
    }
    clockOutChecker() {
        if (this.currentUserSchedule.length == 0) {
            Toast.makeText("You have no schedule today to clock out", "short");
        }
        var outHour = this.currentUserSchedule[0].workDays[0].outHour;
        console.log(outHour);
        if (outHour === "" || outHour == undefined) {
            this.clockout();
        } else {
            let options = {
                title: "Already Clocked Out",
                okButtonText: "Got it"
            };
            confirm(options).then((result: boolean) => {});
        }
    }

    clockin() {
        var today = new Date();
        var hour = today.getHours();
        this.http
            .put(
                this.url + `schedule/${this.currentUserSchedule[0]._id}`,
                {
                    workDays: [
                        {
                            date: today,
                            assignedStartHour: this.currentUserSchedule[0]
                                .workDays[0].assignedStartHour,
                            assignedStopHour: this.currentUserSchedule[0]
                                .workDays[0].assignedStopHour,
                            inHour: hour
                        }
                    ],
                    employee: this.currentUser.userId
                },
                { headers: this.APIHeader() }
            )
            .subscribe(
                result => {
                    this.get_current_user_schedule(this.currentUser.userId);
                },
                error => console.log(error)
            );
    }

    clockout() {
        var today = new Date();
        var hour = today.getHours();
        this.http
            .put(
                this.url + `schedule/${this.currentUserSchedule[0]._id}`,
                {
                    workDays: [
                        {
                            date: today,
                            assignedStartHour: this.currentUserSchedule[0]
                                .workDays[0].assignedStartHour,
                            assignedStopHour: this.currentUserSchedule[0]
                                .workDays[0].assignedStopHour,
                            inHour: this.currentUserSchedule[0].workDays[0]
                                .inHour,
                            outHour: hour
                        }
                    ],
                    employee: this.currentUser.userId
                },
                { headers: this.APIHeader() }
            )
            .subscribe(
                result => {
                    this.get_current_user_schedule(this.currentUser.userId);
                },
                error => console.log(error)
            );
    }

    getTotaWageslbyDateRage(startDate, endDate, total) {
        const employee_id = [];
        this.http
            .get(this.url + "employee", { headers: this.APIHeader() })
            .subscribe(
                result => {
                    result["data"].map(key => employee_id.push(key._id));
                    for (var i = 0; i < employee_id.length; i++) {
                        this.http
                            .get(
                                this.url +
                                    `schedule/workhours/${employee_id[i]}/${startDate}/${endDate}`,
                                { headers: this.APIHeader() }
                            )
                            .subscribe(
                                result => {
                                    total.push(result["data"]);
                                },
                                error => console.log(error)
                            );
                    }
                },
                error => console.log(error)
            );
    }
}
