import { Component, OnInit } from "@angular/core";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { User } from "~/app/share-services/User";
import { ShareService } from "~/app/share-services/share.service";

@Component({
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    ifAndroid: Boolean;
    ifIOS: Boolean;
    user: User;

    c = this.share.currentUser[0];
    name = `${this.c.first_name} ${this.c.last_name}`;
    wage = this.c.wage;
    position = this.c.position;
    email = this.c.email;
    address = this.c.address;
    dob = this.c.dob;

    logout = true;
    title = "";
    constructor(public share: ShareService) {}

    ngOnInit() {
      this.system()
        console.log(this.share.currentUser[0].email);
    }

    system() {
        if (isAndroid) {
            this.ifAndroid = true;
            this.ifIOS = false;
        } else if (isIOS) {
            this.ifIOS = true;
            this.ifAndroid = false;
        }
        if(this.share.currentUser[0].email ==='vuabaybune@gmail.com'){
          return true
        }
        return false
    }

}
