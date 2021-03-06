import { Component, OnInit } from '@angular/core';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
  selector: 'ns-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css']
})
export class EmployeePayrollComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;

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

}
