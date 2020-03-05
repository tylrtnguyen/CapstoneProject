import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { ShareService } from "../../share-services/share.service";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ManagerAddEmployeeComponent } from "../manager-add-employee/manager-add-employee.component";
import { TitleCasePipe } from "@angular/common";
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
        this.http.get(this.share.url+"employee", { headers: this.share.APIHeader() }).subscribe(
            result => {
                this.employees_info = result.data;
                console.log(`This is the employee info ${JSON.stringify(result.data)}`)
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
            message: `Are you sure you want to delete this employee ${data}?`,
            okButtonText: "Yes",
            cancelButtonText: "No"
        };

        confirm(options).then((result: boolean) => {
            const new_list = this.share.employees_info.filter(
                filter => filter.first_name + " " + filter.last_name !== data
            );
            this.share.employees_info = new_list;
            this.employees_info = this.share.employees_info;
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
                console.log(result);
            });
    }

    employee_detail(data) {
        const full_name = data.first_name + " " + data.last_name;
        this.router.navigate(["/manager-employee-detail", full_name]);
    }
}
