import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Employee } from "../model/Employee";
import { DateRange } from "nativescript-ui-calendar";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ShareService {
    constructor(private http: HttpClient,public router : Router) {}

    //back button
    dateRange: DateRange;
    currentUser;
    isLogin = false;
    selected_work_date: String;
    url = `https://restaskest-api.herokuapp.com/api/`;
    urlLoginManager = `https://restaskest-api.herokuapp.com/login/manager`
    urlLoginEmployee = `https://restaskest-api.herokuapp.com/login/employee`
    
    
    Logout() {
        console.log("Share Service log out: ");
        this.isLogin = !this.isLogin;
    }

    APIHeader() {
        var token = {
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzUzNTUxN2U0MGI1NTk3MTIyMCIsImlhdCI6MTU4NDA0Njk3OSwiZXhwIjoxNTg0MDUwNTc5fQ.7IMe_f6oVXAt-JC_1Ik4pK-_yGww3SHF8CH96v194ec"
        };
        let header = new HttpHeaders({
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json"
        });
        return header   
    }

    work_schedule_data = [
        {
            name: "Thanh Quan",
            start_time: "15:00",
            end_time: "17:00",
            position: "Manager",
            date: "Tue Jan 21 2020"
        },
        {
            name: "Thay Ba",
            start_time: "15:00",
            end_time: "17:00",
            position: "Manager",
            date: "Tue Jan 21 2020"
        },
        {
            name: "Tu Nguyen",
            start_time: "15:00",
            end_time: "17:00",
            position: "Janitor",
            date: "Tue Jan 21 2020"
        },
        {
            name: "Thanh Dep Trai",
            start_time: "15:00",
            end_time: "17:00",
            position: "CEO",
            date: "Wed Jan 22 2020"
        },
        {
            name: "Quang Pham",
            start_time: "15:00",
            end_time: "17:00",
            position: "Striper 1",
            date: "Wed Jan 22 2020"
        },
        {
            name: "Thong Nguyen",
            start_time: "15:00",
            end_time: "17:00",
            position: "Striper 2",
            date: "Wed Jan 22 2020"
        }
    ];


    add_work_schedule(schedule) {
        console.log("------- Add Schedule -------");
        const template = {
            name: "",
            start_time: "",
            end_time: "",
            position: "Temp Position",
            date: ""
        };
        template.name = schedule.nameList[0];
        template.start_time = schedule.start_time.substring(0, 5); // remove last 2 digit
        template.end_time = schedule.end_time.substring(0, 5); // remove last 2 digit
        template.date = schedule.date;
        this.work_schedule_data.push(template);
    }
}
