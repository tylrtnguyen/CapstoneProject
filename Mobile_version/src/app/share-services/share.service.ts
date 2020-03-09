import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Employee } from "./Employee";
import { DateRange } from "nativescript-ui-calendar";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ShareService {
    constructor(private http: HttpClient) {}

    //back button
    dateRange: DateRange;
    currentUser;
    isLogin = false;
    server_employee_list;
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
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzZlNTUxN2U0MGI1NTk3MTIyMSIsImlhdCI6MTU4Mzc3NDAzNCwiZXhwIjoxNTgzNzc3NjM0fQ.6MPYMQIqzpJ_mLZ2KKIWtE3WuF7-G54uRsu5CI5qre0",
            expiresIn: "3600s",
            status: "Logged In"
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

    managers_info = [];
    employees_info = [
        // {
        //     first_name: "Thanh",
        //     last_name: "Quan",
        //     wage: "15",
        //     position: "CEO",
        //     email: "vuabaybune@gmail.com",
        //     password: "Thanhquan123",
        //     address: "somewhere in toronto",
        //     dob: "16/1/1999"
        // },
        // {
        //     first_name: "Tu",
        //     last_name: "Quan",
        //     wage: "15",
        //     position: "CEO",
        //     email: "tuquan@gmail.com",
        //     password: "Thanhquan123",
        //     address: "somewhere in toronto",
        //     dob: "16/1/1999"
        // },
        // {
        //     first_name: "Thong",
        //     last_name: "Quan",
        //     wage: "15",
        //     position: "CEO",
        //     email: "thongquan@gmail.com",
        //     password: "Thanhquan123",
        //     address: "somewhere in toronto",
        //     dob: "16/1/1999"
        // }
    ];

    add_employee(employee) {
        const template = {
            first_name: employee[0],
            last_name: employee[1],
            wage: employee[2],
            position: employee[3],
            email: employee[4],
            password: employee[5],
            address: employee[6],
            dob: employee[7]
        };
        this.employees_info.push(template);
        console.log("Share service : " + JSON.stringify(this.employees_info));
    }

    inventory = [
        {
            product_id: "0000001",
            product_name: "Corn",
            product_type: "Vegetable",
            product_price: "1.99$",
            product_seller: "Corn Industrial",
            seller_email: "quantrithanh1999@gmail.com",
            seller_phone_number: "6474651767"
        },
        {
            product_id: "0000002",
            product_name: "Dog Meat",
            product_type: "Meat",
            product_price: "10.99$",
            product_seller: "Dog Shelter",
            seller_email: "quantrithanh1999@gmail.com",
            seller_phone_number: "6474651767"
        },
        {
            product_id: "0000003",
            product_name: "Apple",
            product_type: "Vegetable",
            product_price: "1.99$",
            product_seller: "Apple Industrial",
            seller_email: "quantrithanh1999@gmail.com",
            seller_phone_number: "6474651767"
        },
        {
            product_id: "0000004",
            product_name: "Grounded meat",
            product_type: "Meat",
            product_price: "1.99$",
            product_seller: "Meat Industrial",
            seller_email: "quantrithanh1999@gmail.com",
            seller_phone_number: "6474651767"
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
