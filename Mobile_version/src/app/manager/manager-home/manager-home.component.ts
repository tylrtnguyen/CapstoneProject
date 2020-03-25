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
    styleUrls: ["./manager-home.component.css"]
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
        { month: "January", money: 7 },
        { month: "Feburary", money: 15 },
        { month: "March", money: 30 },
        { month: "April", money: 19 },
        { month: "May", money: 20 },
        { month: "June", money: 22 },
        { month: "July", money: 21 },
        { month: "August", money: 25 },
        { month: "Septemper", money: 21 },
        { month: "October", money: 22 },
        { month: "November", money: 15 },
        { month: "December", money: 27 }
    ];


    material = [ ];

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
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    this.material = result["data"];
                },
                error => console.log(error)
            );
    }
}
