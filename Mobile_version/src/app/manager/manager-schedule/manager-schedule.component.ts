import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { action } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
@Component({
    selector: "ns-manager-schedule",
    templateUrl: "./manager-schedule.component.html",
    styleUrls: ["./manager-schedule.component.css"]
})
export class ManagerScheduleComponent implements OnInit {
    message: String;
    ifAndroid: Boolean;
    ifIOS: Boolean;

    temp_dataItems = [];
    receive_current_time($event) {
        this.message = $event;
        this.filter();
    }

    filter() {
        console.log(this.message);
        const filtered_word = this.share.work_schedule_data.filter(
            employee => employee.date === this.message
        );
        console.log(filtered_word);
        this.temp_dataItems = filtered_word;
    }

    constructor(public router: Router,public page: Page , public share : ShareService) {
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
