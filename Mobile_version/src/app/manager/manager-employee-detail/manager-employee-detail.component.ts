import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "./Employee";
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
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
            {
                name: "first_name",
                displayName: "First Name",
                index: 0
            },
            {
                name: "last_name",
                displayName: "Last Name",
                index: 1
            },
            {
                name: "email",
                displayName: "E-Mail",
                index: 2,
                editor: "Email"
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
                //Date Picker not current date
                index: 4
            },
            {
                name: "position",
                displayName: "Position",
                index: 5
            },
            {
                name: "address",
                displayName: "address",
                index: 6
            },
            {
                name: "phone_number",
                displayName: "Phone Number",
                index: 7
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
            filter => filter.name === query
        );
        const em = this.employee_detail[0];
        let firstname = "";
        let lastname = "";
        [firstname, lastname] = query.split(" ");
 
        //Pre value put in
        this.temp_employee = [
            firstname,
            lastname,
            em.email,
            parseInt(em.wage),
            em.dob,
            em.position,
            em.address,
            em.phone_number
        ]

        this._employee = new Employee(
            firstname,
            lastname,
            em.email,
            parseInt(em.wage),
            em.dob,
            em.position,
            em.address,
            em.phone_number
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
        // console.log(JSON.stringify(em_store))
        // console.log(this.temp_employee)
        const em_store_arr = [
            em_store.first_name,
            em_store.last_name,
            em_store.email,
            em_store.wage,
            em_store.dob,
            em_store.position,
            em_store.address,
            em_store.phone_number
        ];

        //COMPARE PRE VALUE AND POST VALUE
        // PRE Value
        console.log(this.temp_employee)
        // POST Value
        console.log(em_store)

        const check_change = this.temp_employee.filter(filter =>filter===em_store_arr)
        console.log(check_change.length)
        if(check_change.length == 0)
        {
            console.log("You have not change any data yet !")
        }
        else{
            alert(
                {
                    title: "Employee Change Details",
                    message: `${em_store_arr[0]} ${em_store_arr[1]} information has been updated`,
                    okButtonText: "OK"
                });
        }
        
    }
}
