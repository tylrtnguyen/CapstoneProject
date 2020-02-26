import { Component, OnInit } from '@angular/core';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";


@Component({
  selector: 'ns-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  id = '123456'
  name = 'Tu Nguyen'
  email = 'nvatu129@test.test'
  phone = '(647) 746 7746'
  location = 'Chew & Chill (Dundas)'
  department = 'FOH'

  constructor() { }


  ngOnInit() {
    if (isAndroid) {
      this.ifAndroid = true;
      this.ifIOS = false;
  } else if (isIOS) {
      this.ifIOS = true;
      this.ifAndroid = false;
  }
  }
  changeEmail() {
    dialogs.prompt({
      title: "Change Email",
      message: "Please enter your new email address",
      okButtonText: "Confirm",
      cancelButtonText: "Cancel",
      defaultText: this.email,
      inputType: dialogs.inputType.email
    }).then((r) => {
      if(r.result === true) this.email = r.text;
    })
  }
  changePhone() {
    dialogs.prompt({
      title: "Change Phone Number",
      message: "Please enter your new phone number",
      okButtonText: "Confirm",
      cancelButtonText: "Cancel",
      defaultText: this.phone,
      inputType: dialogs.inputType.phone
    }).then((r) => {
      if(r.result === true) this.phone = r.text;
    })
  }

}
