import { Component, OnInit, ViewChild } from "@angular/core";
import {
    ModalDialogService,
    ModalDialogParams
} from "nativescript-angular/modal-dialog";
import { Employee } from "../../model/Employee";
import { ShareService } from "~/app/share-services/share.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "ns-manager-add-employee",
    templateUrl: "./manager-add-employee.component.html",
    styleUrls: ["./manager-add-employee.component.css"]
})
export class ManagerAddEmployeeComponent implements OnInit {
    private _employee: Employee;

    constructor(
        public params: ModalDialogParams,
        public share: ShareService,
        private router: Router,
        public modal: ModalDialogService,
        private http : HttpClient
    ) {}
    @ViewChild("employee_radForm", { static: false })
    myEmployeeDataForm: RadDataFormComponent;
    ngOnInit() {
        this._employee = new Employee("", "", "", null, "", "", "","");
    }
    get employee(): Employee {
        return this._employee;
    }
    employee_meta = {
        isReadOnly: false,
        commitMode: "manual",
        validationMode: "lostFocus",
        propertyAnnotations: [
            {
                name: "first_name",
                displayName: "First Name",
                index: 0,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            },
            {
                name: "last_name",
                displayName: "Last Name",
                index: 1,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            },
            {
                name: "email",
                displayName: "E-Mail",
                index: 2,
                editor: "Email",
                validators: [
                    {
                        name: "RegEx",
                        params: {
                            regEx:
                                "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",

                            errorMessage:
                                "Please provide your @employee.com email."
                        }
                    },
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 10 } },
                    { name: "MaximumLength", params: { length: 200 } }
                ]
            },
            {
                name: "wage",
                displayName: "Wage",
                editor: "Number",
                index: 3
            },
            {
                name: "department",
                displayName: "Department",
                index: 4,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } }
                ]
            },
            {
                name: "dob",
                displayName: "Date of Birth",
                index: 5,
                validators: [
                    // {
                    //     name: "RegEx",
                    //     params: {
                    //         regEx:
                    //             "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$",
                    //         errorMessage: "Date Format : Date/Month/Year"
                    //     }
                    // },
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 11 } }
                ]
            },
            {
                name: "gender",
                displayName: "Gender",
                index: 6,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } }
                ]
            },
            {
                name: "address",
                displayName: "address",
                index: 7,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } },
                    { name: "MaxiumLength", params: { length: 100 } }
                ]
            }
        ]
    };
    submit() {
        console.log("Create a new user");
        this.myEmployeeDataForm.dataForm.commitAll();
        const em_store = this.myEmployeeDataForm.dataForm.source;
        console.log(JSON.stringify(em_store))
        this.http
            .post(
                this.share.url + "employee",
                {
                    fName: em_store.first_name,
                    lName: em_store.last_name,
                    email: em_store.email,
                    department: em_store.department,
                    wages: em_store.wage,
                    DOB: em_store.dob,
                    gender: em_store.gender,
                    address:  em_store.address,
                    isPermanent: false,
                    password: "123456789"
                },
                { headers: this.share.APIHeader() }
            )
            .subscribe(
                result => {
                    this.params.closeCallback()
                },
                error => {
                    console.log("POST REQUEST ERROR : " + JSON.stringify(error));
                }
            );
    }
}
