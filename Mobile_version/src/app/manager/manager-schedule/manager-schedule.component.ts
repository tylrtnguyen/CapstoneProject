import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { action } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
@Component({
    selector: "ns-manager-schedule",
    templateUrl: "./manager-schedule.component.html",
    styleUrls: ["./manager-schedule.component.css"]
})
export class ManagerScheduleComponent implements OnInit {
    message: String;
    ifAndroid: Boolean;
    ifIOS: Boolean;
    dataItems = [
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
    temp_dataItems = [];
    receive_current_time($event) {
        this.message = $event;
        this.filter();
    }

    filter() {
        console.log(this.message);
        const filtered_word = this.dataItems.filter(
            employee => employee.date === this.message
        );
        console.log(filtered_word);
        this.temp_dataItems = filtered_word;
    }

    constructor(public router: Router,public page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
    }

    home() {
        this.router.navigateByUrl("/manager-home");
    }
    work_history() {
        this.router.navigateByUrl("/manager-work-history");
    }
    inventory() {
        this.router.navigateByUrl("/manager-inventory");
    }
    employee() {
        this.router.navigateByUrl("/manager-employee-list");
    }




}
