import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
import { ObservableArray } from "tns-core-modules/data/observable-array";

// import { ActionBarComponent } from "~/app/share-component/action-bar/action-bar.component";

@Component({
    selector: "ns-manager-home",
    templateUrl: "./manager-home.component.html",
    styleUrls: ["./manager-home.component.css"],
})
export class ManagerHomeComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Manager Home";
    num_worker = 0;
    constructor(
        public router: Router,
        public page: Page,
        public share: ShareService,
        public http: HttpClient
    ) {}

    //we don't have money to buy a pos api data so dummy data it's
    sale_data = [
        { month: "Jan", money: 7 },
        { month: "Feb", money: 15 },
        { month: "Mar", money: 30 },
        { month: "Apr", money: 19 },
        { month: "May", money: 20 },
        { month: "Jun", money: 22 },
        { month: "Jul", money: 21 },
        { month: "Aug", money: 25 },
        { month: "Sep", money: 21 },
        { month: "Oct", money: 22 },
        { month: "Nov", money: 15 },
        { month: "Dec", money: 27 },
    ];

    material = [];

    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.http
            .get(this.share.url + "material", {
                headers: this.share.APIHeader(),
            })
            .subscribe(
                (result) => {
                    this.material = result["data"];
                },
                (error) => console.log(error)
            );
    }
}
