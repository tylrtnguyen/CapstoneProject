import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ShareService } from "~/app/share-services/share.service";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { HttpClient } from "@angular/common/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { ManagerInventoryDetailComponent } from "../manager-inventory-detail/manager-inventory-detail.component";

@Component({
    selector: "ns-manager-inventory",
    templateUrl: "./manager-inventory.component.html",
    styleUrls: ["./manager-inventory.component.css"]
})
export class ManagerInventoryComponent implements OnInit {
    ifIOS: boolean;
    ifAndroid: boolean;
    title = "Inventory";
    material = [];
    constructor(
        public share: ShareService,
        private http: HttpClient,
        public modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: Router
    ) {}
    inventory = [];
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
    edit_item(data) {
        console.log("Taped add button");
        let options = {
            context: { data: data },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal
            .showModal(ManagerInventoryDetailComponent, options)
            .then(result => {
                this.http
                    .get(this.share.url + "material", {
                        headers: this.share.APIHeader()
                    })
                    .subscribe(
                        result => {
                            this.material = result["data"];
                        },
                        error => {
                            console.log("GET REQUEST ERROR : " + error);
                        }
                    );
            });
    }

    delete_item(data) {
        let options = {
            title: "Delete Employee",
            message: `Are you sure you want to delete this employee ${data.name}?`,
            okButtonText: "Yes",
            cancelButtonText: "No"
        };

        confirm(options).then((result: boolean) => {
            if (result) {
                this.http
                    .delete(this.share.url + `material/${data._id}`, {
                        headers: this.share.APIHeader()
                    })
                    .subscribe(
                        result => {
                            this.http
                                .get(this.share.url + "material", {
                                    headers: this.share.APIHeader()
                                })
                                .subscribe(
                                    result => {
                                        this.material = result["data"];
                                    },
                                    error => {
                                        console.log(
                                            "GET REQUEST ERROR : " + error
                                        );
                                    }
                                );
                        },
                        error => console.log(error)
                    );
            } else {
                console.log(
                    "You don't want to erase this material from our database"
                );
            }
        });
    }
}
