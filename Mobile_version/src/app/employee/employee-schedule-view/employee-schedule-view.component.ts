import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ns-employee-schedule-view',
  templateUrl: './employee-schedule-view.component.html',
  styleUrls: ['./employee-schedule-view.component.css']
})
export class EmployeeScheduleViewComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  home(){
    this.router.navigateByUrl("/employee-home");
  }

}
