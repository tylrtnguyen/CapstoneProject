import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { ShareService } from "../../share-services/share.service";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ManagerAddEmployeeComponent } from "../manager-add-employee/manager-add-employee.component";
import { TitleCasePipe } from "@angular/common";
import * as Toast from "nativescript-toast";
import { ManagerEmployeeDetailComponent } from "../manager-employee-detail/manager-employee-detail.component";

@Component({
    selector: "ns-manager-employee-list",
    templateUrl: "./manager-employee-list.component.html",
    styleUrls: ["./manager-employee-list.component.css"]
})
export class ManagerEmployeeListComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    title = "Employee List";
    employees_info;

    constructor(
        private http: HttpClient,
        private router: Router,
        public share: ShareService,
        public modal: ModalDialogService,
        private vcRef: ViewContainerRef
    ) {}
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.http
            .get(this.share.url + "employee", {
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    this.employees_info = result["data"];
                },
                error => {
                    console.log(error);
                }
            );
    }

    confirmation(data) {
        console.log("Confirmation");
        let options = {
            title: "Delete Employee",
            message: `Are you sure you want to delete this employee ${data.fName}?`,
            okButtonText: "Yes",
            cancelButtonText: "No"
        };

        confirm(options).then((result: boolean) => {
            if (result) {
                var new_list = [];
                this.http
                    .delete(this.share.url + `employee/${data._id}`, {
                        headers: this.share.APIHeader()
                    })
                    .subscribe(
                        result => {
                            // new_list = result['data'];
                            this.http
                                .get(this.share.url + "employee", {
                                    headers: this.share.APIHeader()
                                })
                                .subscribe(
                                    result => {
                                        this.employees_info = result["data"];
                                    },
                                    error => {
                                        console.log(
                                            "GET REQUEST ERROR : " + error
                                        );
                                    }
                                );
                        },
                        error => {
                            console.log(error);
                        }
                    );
            } else {
                console.log(
                    "You don't want to erase this employee from our database"
                );
            }
        });
    }

    addEmployee() {
        console.log("Taped add button");
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal
            .showModal(ManagerAddEmployeeComponent, options)
            .then(result => {
                this.http
                    .get(this.share.url + "employee", {
                        headers: this.share.APIHeader()
                    })
                    .subscribe(
                        result => {
                            this.employees_info = result["data"];
                        },
                        error => {
                            console.log("GET REQUEST ERROR : " + error);
                        }
                    );
            });
    }

    employee_detail(data) {
        let options = {
            context: {data : data},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal
            .showModal(ManagerEmployeeDetailComponent, options)
            .then(result => {
                this.http
                    .get(this.share.url + "employee", {
                        headers: this.share.APIHeader()
                    })
                    .subscribe(
                        result => {
                            this.employees_info = result["data"];
                        },
                        error => {
                            console.log("GET REQUEST ERROR : " + error);
                        }
                    );
            });
    }
}
