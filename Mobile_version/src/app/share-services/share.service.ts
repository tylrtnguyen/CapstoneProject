import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Employee } from "./Employee";

@Injectable({
    providedIn: "root"
})
export class ShareService {
    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions
    ) {}
    //fuck you back button

    currentUser ;
    isLogin = false;
    Login(user){
        console.log('Share Service currently log in:' + JSON.stringify(user) );
        this.currentUser = user
        this.isLogin = true;
    }
    Logout()
    {
        console.log("Share Service log out : " )
        this.isLogin = !this.isLogin
    }

    selected_work_date: String;
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

    employees_info = [
        {
            first_name: "Thanh",
            last_name: "Quan",
            wage: "15",
            position: "CEO",
            email: "vuabaybune@gmail.com",
            password: "Thanhquan123",
            address: "somewhere in toronto",
            dob: "16/1/1999"
        },
        {
            first_name: "Tu",
            last_name: "Quan",
            wage: "15",
            position: "CEO",
            email: "tuquan@gmail.com",
            password: "Thanhquan123",
            address: "somewhere in toronto",
            dob: "16/1/1999"
        },
        {
            first_name: "Thong",
            last_name: "Quan",
            wage: "15",
            position: "CEO",
            email: "thongquan@gmail.com",
            password: "Thanhquan123",
            address: "somewhere in toronto",
            dob: "16/1/1999"
        }
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
        console.log("Share service : " + JSON.stringify(this.employees_info))
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
