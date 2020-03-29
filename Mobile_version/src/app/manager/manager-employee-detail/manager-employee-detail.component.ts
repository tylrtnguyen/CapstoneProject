import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "../../model/Employee";
import { ShareService } from "~/app/share-services/share.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import {
    ModalDialogService,
    ModalDialogParams
} from "nativescript-angular/modal-dialog";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "ns-manager-employee-detail",
    templateUrl: "./manager-employee-detail.component.html",
    styleUrls: ["./manager-employee-detail.component.css"]
})
export class ManagerEmployeeDetailComponent implements OnInit {
    private _employee: Employee;
    public data;
    private gender  = ['Male','Female']
    ifAndroid: Boolean;
    ifIOS: Boolean;
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
                    {
                        name: "RegEx",
                        params: {
                            regEx: "^[a-zA-Z]+$",

                            errorMessage: "Ensure your name format is correct"
                        }
                    },
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 } }
                ]
            },
            {
                name: "last_name",
                displayName: "Last Name",
                index: 1,
                validators: [
                    {
                        name: "RegEx",
                        params: {
                            regEx: "^[a-zA-Z]+$",

                            errorMessage: "Ensure your name format is correct"
                        }
                    },
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
                name: "password",
                displayName: "Password",
                index: 3
            },
            {
                name: "wage",
                displayName: "Wage",
                editor: "Number",
                index: 4
            },
            {
                name: "department",
                displayName: "Department",
                index: 5,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } }
                ]
            },
            {
                name: "dob",
                displayName: "Date of Birth",
                index: 6,
                editor : "DatePicker",
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 11 } }
                ]
            },
            {
                name: "gender",
                displayName: "Gender",
                index: 7,
                editor : "Picker",
                valuesProvider: this.gender,
                validators: [
                    {
                        name: "RegEx",
                        params: {
                            regEx: "^[a-zA-Z]+$",

                            errorMessage: "Ensure your name format is correct"
                        }
                    },
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } }
                ]
            },
            {
                name: "address",
                displayName: "address",
                index: 8,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } },
                    { name: "MaxiumLength", params: { length: 100 } }
                ]
            }
        ]
    };
    constructor(
        public params: ModalDialogParams,
        private route: ActivatedRoute,
        public share: ShareService,
        public router: Router,
        public http: HttpClient
    ) {}
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        this.data = this.params.context.data;
        console.log(JSON.stringify(this.params.context.data));
        this._employee = new Employee(
            this.data.fName,
            this.data.lName,
            this.data.email,
            this.data.wages,
            this.data.department,
            this.data.DOB,
            this.data.gender,
            this.data.address,
        );
    }

    get employee(): Employee {
        return this._employee;
    }

    @ViewChild("employee_radForm", { static: false })
    myEmployeeDataForm: RadDataFormComponent;
    submit() {
        this.myEmployeeDataForm.dataForm
            .validateAndCommitAll()
            .then(result => {
                if (result) {
                    const em_store = this.myEmployeeDataForm.dataForm.source;
                    this.http
                        .put(
                            this.share.url + `employee/${this.data._id}`,
                            {
                                fName: em_store.first_name,
                                lName: em_store.last_name,
                                email: em_store.email,
                                department: em_store.department,
                                wages: em_store.wage,
                                DOB: em_store.dob,
                                gender: em_store.gender,
                                address: em_store.address,
                            },
                            { headers: this.share.APIHeader() }
                        )
                        .subscribe(
                            result => this.params.closeCallback(),
                            error => console.log(error)
                        );
                }
            })
            .catch(err => {});
    }
    cancel() {
        this.params.closeCallback();
    }
}
