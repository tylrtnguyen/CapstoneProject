import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";

// import { ActionBarComponent } from "~/app/share-component/action-bar/action-bar.component";

@Component({
    selector: "ns-manager-home",
    templateUrl: "./manager-home.component.html",
    styleUrls: ["./manager-home.component.css"]
})
export class ManagerHomeComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Manager Home";
    num_worker = 0;
    clock_data = [{ name: "Something" }];
    constructor(
        public router: Router,
        public page: Page,
        public share: ShareService,
        public http: HttpClient
    ) {}

    dummy_data = [];
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
                    for(var i = 0 ; i < schedule.length ; i++)
                    {
                        const today_employee = schedule[i].employee
                        const today = schedule[i].workDays[0].date.substr(0,10)

                        if(today === systemDate )
                        {
                            this.http.get(this.share.url+`employee/${today_employee}`,{headers:this.share.APIHeader()}).subscribe(
                                result=>{
                                    this.dummy_data.push(result['data'])
                                    this.num_worker = this.dummy_data.length
                                },
                                error=>console.log(error)
                            )
                        }
                        else{
                            this.num_worker = 0;
                        }
                    }
                },
                error => console.log(error)
            );
    }

    schedule() {
        this.router.navigateByUrl("/manager-schedule");
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
