import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "../../share-services/Employee";
import { ShareService } from "~/app/share-services/share.service";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { Page } from "tns-core-modules/ui/page";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
    selector: "ns-manager-employee-detail",
    templateUrl: "./manager-employee-detail.component.html",
    styleUrls: ["./manager-employee-detail.component.css"]
})
export class ManagerEmployeeDetailComponent implements OnInit {
    private _employee: Employee;
    ifAndroid: Boolean;
    ifIOS: Boolean;
    employee_meta = {
        isReadOnly: false,
        commitMode: "manual",
        validationMode: "immediate",
        propertyAnnotations: [
            {
                name: "first_name",
                displayName: "First Name",
                index: 0,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 , errorMessage:
                        "Ensure your name is in the right format"} }
                ]
            },
            {
                name: "last_name",
                displayName: "Last Name",
                index: 1,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 50 , errorMessage:
                        "Ensure your name is in the right format"} }
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
                name: "dob",
                displayName: "Date of Birth",
                index: 4,
                validators: [
                    {
                        name: "RegEx",
                        params: {
                            regEx:
                                "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$",
                            errorMessage: "Date Format : Date/Month/Year"
                        }
                    },
                    { name: "NonEmpty" },
                    { name: "MaximumLength", params: { length: 11 } }
                ]
            },
            {
                name: "position",
                displayName: "Position",
                index: 5,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } }
                ]
            },
            {
                name: "address",
                displayName: "address",
                index: 6,
                validators: [
                    { name: "NonEmpty" },
                    { name: "MinimumLength", params: { length: 3 } },
                    { name: "MaxiumLength", params: { length: 100 } }
                ]
            }
        ]
    };
    constructor(
        private route: ActivatedRoute,
        public share: ShareService,
        public router: Router
    ) {}
    temp_employee;
    employee_detail;
    ngOnInit() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        const query = this.route.snapshot.params.id;
        this.employee_detail = this.share.employees_info.filter(
            filter => filter.first_name + " " +filter.last_name === query
        );
        const em = this.employee_detail[0];


        //Pre value put in
        this.temp_employee = [
            em.first_name,
            em.last_name,
            em.email,
            parseInt(em.wage),
            em.dob,
            em.position,
            em.address
        ];

        this._employee = new Employee(
            em.first_name,
            em.last_name,
            em.email,
            parseInt(em.wage),
            em.dob,
            em.position,
            em.address
        );
    }

    get employee(): Employee {
        return this._employee;
    }

    @ViewChild("employee_radForm", { static: false })
    myEmployeeDataForm: RadDataFormComponent;
    submit() {
        this.myEmployeeDataForm.dataForm.commitAll();
        const em_store = this.myEmployeeDataForm.dataForm.source;

        const em_store_arr = [
            em_store.first_name,
            em_store.last_name,
            em_store.email,
            em_store.wage,
            em_store.dob,
            em_store.position,
            em_store.address
        ];

        //Compare pre value and post value
        const check_change = this.temp_employee.filter(
            filter => filter === em_store_arr
        );
        if (check_change.length == 0) {
        } else {
            alert({
                title: "Employee Change Details",
                message: `${em_store_arr[0]} ${em_store_arr[1]} information has been updated`,
                okButtonText: "OK"
            });
        }
    }
}
