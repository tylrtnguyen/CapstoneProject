import { Component, OnInit } from "@angular/core";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
import * as Toast from "nativescript-toast";

import {
    prompt,
    PromptResult,
    PromptOptions,
    inputType,
} from "tns-core-modules/ui/dialogs";
import { ListViewEventData } from "nativescript-ui-listview";
@Component({
    selector: "ns-employee-inventory",
    templateUrl: "./employee-inventory.component.html",
    styleUrls: ["./employee-inventory.component.css"],
})
export class EmployeeInventoryComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = " Inventory Report";
    inventory_data = [];
    selected_update = [];
    constructor(public share: ShareService, public http: HttpClient) {}

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
                    this.inventory_data = result["data"];
                },
                (error) => console.log(error)
            );
    }

    //get list of employee
    public onItemSelected(args: ListViewEventData) {
        // this.selected_employees.push(this.dataItems[args.index])
        let id = this.inventory_data[args.index]._id;
        this.selected_update.push(id);
    }
    public onItemDeselected(args: ListViewEventData) {
        let id = this.inventory_data[args.index]._id;
        this.selected_update = this.selected_update.filter(
            (employee) => employee != id
        );
    }

    update_material_quantity() {
        if (this.selected_update.length == 0) {
            Toast.makeText("Please assign all information needed").show();
        } else {
            this.http.post(this.share.url+"inventory",{"materials" : this.selected_update},{headers : this.share.APIHeader()}).subscribe(result=>{
                Toast.makeText("Request has been sent").show();
            },error=>console.log(error))
        }
    }
}
