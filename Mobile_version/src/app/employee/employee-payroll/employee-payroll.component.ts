import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css']
})
export class EmployeePayrollComponent implements OnInit {

  today = new Date();
  currentDate  = String(this.today.getMonth() + 1) + '/' + String(this.today.getDate()) + '/' + this.today.getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
