import { Component, OnInit } from '@angular/core';
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
  selector: 'ns-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  message = "Unfortunately, we cannot assist you in this case. Please contact your manager/owner and ask for invitation"
  constructor() { }
  ngOnInit() {
  }
  showDialog(){
    dialogs.alert({
      title: "Alert",
      message: this.message,
      okButtonText: "Got it"
  })
  }
}
