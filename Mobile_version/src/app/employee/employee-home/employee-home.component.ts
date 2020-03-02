import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  title = 'Employee Name Home'
  constructor(public router: Router, public page: Page) {
    //   this.page.actionBarHidden = true;
  }

  ngOnInit() {
      if (isAndroid) {
          this.ifAndroid = true;
          this.ifIOS = false;
      } else if (isIOS) {
          this.ifIOS = true;
          this.ifAndroid = false;
      }
  }

//   schedule() {
//       this.router.navigateByUrl("/employee-schedule");
//   }
//   payroll() {
//       this.router.navigateByUrl("/employee-payroll");
//   }
//   inventory() {
//       this.router.navigateByUrl("/employee-inventory");
//   }
//   profile() {
//       this.router.navigateByUrl("/employee-profile");
//   }

}
