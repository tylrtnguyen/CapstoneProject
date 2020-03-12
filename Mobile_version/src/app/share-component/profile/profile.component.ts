import { Component, OnInit } from "@angular/core";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { User } from "~/app/model/User";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    user: User;

    c = this.share.employees_info[0];
    name;
    wage;
    email;
    address;
    dob;
    restaurants;
    restaurant_address;
    pos ;

    logout = true;
    title = "";
    constructor(public share: ShareService, private http: HttpClient) {}

    ngOnInit() {
        this.system();
        if (this.share.currentUser.role === "manager") {
            this.http
                .get(
                    this.share.url + `manager/${this.share.currentUser.userId}`,
                    { headers: this.share.APIHeader() }
                )
                .subscribe(
                    result => {
                        const user = result["data"];
                        this.name = user.fName + user.lName;
                        this.wage = user.wages;
                        this.email = user.email;
                        this.address = user.address;
                        this.dob = user.DOB;
                        this.http
                            .get(
                                this.share.url +
                                    `restaurant/${user.restaurants}`,
                                { headers: this.share.APIHeader() }
                            )
                            .subscribe(
                                result => {
                                    console.log(JSON.stringify(result['data'].name))
                                    this.restaurants = result['data'].name;
                                    this.restaurant_address = result['data'].address;
                                    this.pos = result['data'].pos
                                },
                                error => console.log(error)
                            );
                    },
                    error => console.log(error)
                );
        } else if (this.share.currentUser.role === "employee") {
            this.http
                .get(
                    this.share.url +
                        `employee/${this.share.currentUser.userId}`,
                    { headers: this.share.APIHeader() }
                )
                .subscribe(
                    result =>
                        console.log(
                            `EMPLOYEE INFO : ${JSON.stringify(result)}`
                        ),
                    error => console.log(error)
                );
        }

        // console.log(this.share.currentUser[0].email);
    }

    system() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        // if(this.share.employees_info[0].email ==='tutester@gmail.com'){
        //   return true
        // }
        // return false
    }
}
