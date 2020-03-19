import { Component, OnInit } from "@angular/core";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "ns-employee-inventory",
    templateUrl: "./employee-inventory.component.html",
    styleUrls: ["./employee-inventory.component.css"]
})
export class EmployeeInventoryComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = " Inventory Report";
    inventory_data = [ ];
    constructor(public share : ShareService , public http : HttpClient) {}

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
                this.inventory_data = result["data"];
            },
            error => console.log(error)
        );
    }
}
