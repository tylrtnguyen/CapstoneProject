import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "./Employee";
import { ShareService } from "~/app/share-services/share.service";

@Component({
    selector: "ns-manager-employee-detail",
    templateUrl: "./manager-employee-detail.component.html",
    styleUrls: ["./manager-employee-detail.component.css"]
})
export class ManagerEmployeeDetailComponent implements OnInit {
    private _employee: Employee;
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
                index: 3
            },
            {
                name: "dob",
                displayName: "Date of Birth",
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
    constructor(private route: ActivatedRoute, public share: ShareService, public router : Router) {}

    employee_detail;
    ngOnInit() {
        const query = this.route.snapshot.params.id;
        this.employee_detail = this.share.employees_info.filter(
            filter => filter.name === query
        );
        const em = this.employee_detail[0];
        console.log(em.phone_number);
        let firstname = "";
        let lastname = "";
        [firstname, lastname] = query.split(" ");
        console.log(typeof em.phone_number);
        this._employee = new Employee(
            firstname,
            lastname,
            em.email,
            parseInt(em.wage),
            em.dob,
            em.posistion,
            em.address,
            em.phone_number
        );
        //fuck you back button demo
        
    }
    get employee(): Employee {
        return this._employee;
    }

    submit(){
      console.log("Submit button pressed")
      
    }

}
