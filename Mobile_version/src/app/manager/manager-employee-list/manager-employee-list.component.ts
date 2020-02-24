import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { ShareService} from "../../share-services/share.service";
@Component({
    selector: "ns-manager-employee-list",
    templateUrl: "./manager-employee-list.component.html",
    styleUrls: ["./manager-employee-list.component.css"]
})
export class ManagerEmployeeListComponent implements OnInit {
   
    employees_info = []

    constructor(private http: HttpClient,private router : Router,public share : ShareService) {}
    ngOnInit() {
        this.employees_info = this.share.employees_info
    }

    confirmation(data){
        console.log("Confirmation")
        let options = {
            title: "Race selection",
            message: `Are you sure you want to delete this employee ${data}?`,
            okButtonText: "Yes",
            cancelButtonText: "No",           
        };
        
        confirm(options).then((result: boolean) => {
            const new_list = this.share.employees_info.filter(filter=>filter.name !== data)
            this.share.employees_info = new_list
            this.employees_info = this.share.employees_info
        }); 
    }


    employee_detail(data)
    {
        this.router.navigate(["/manager-employee-detail", data.name]);
    }
    // getAPI() {
    //     var token = {
    //         token:
    //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzUzNTUxN2U0MGI1NTk3MTIyMCIsImlhdCI6MTU4MjM1NjQ1NSwiZXhwIjoxNTgyMzYwMDU1fQ.c_qrkTC634khqvVKHGrsfcvU5hb_4vEufwNZbQ0jFKQ",
    //         expiresIn: "3600s",
    //         status: "Logged In"
    //     };
    //     var url = "https://restaskest-rest-api.herokuapp.com/api/user";
    //     let header = new HttpHeaders({
    //       "Authorization": "Bearer " + token,
    //       "Content-Type": "application/json",
    //     })
    //     return this.http.get(url, { headers: header }).subscribe((result) => {
    //       this.retrieveData(result);
    //   }, (error) => {
    //       console.log(error);
    //   });;

    // }

    // name: String;
    // email: String;
    // password: String;
    // timestamp: Date;
    // retrieveData(data){
    //   var readable_data = JSON.stringify(data)
    //   for(var i = 0 ; i < data.length ; i++)
    //   {
    //     console.log(data[i].name + "  " + data[i].password)
    //   }
    // }

    
}
