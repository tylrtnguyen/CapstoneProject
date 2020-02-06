import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ns-employee-schedule-view',
  templateUrl: './employee-schedule-view.component.html',
  styleUrls: ['./employee-schedule-view.component.css']
})
export class EmployeeScheduleViewComponent implements OnInit {

  
  today = new Date();
  tomorrow = new Date(this.today);
  
  Day = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    
  ]
  
  // currentDate  = String(this.today.getMonth() + 1) + '/' + String(this.today.getDate()) + '/' + this.today.getFullYear();
  // Week_begin  = String(this.today.getMonth() + 1) + '/' + String(this.today.getDate()) + '/' + this.today.getFullYear();
  Week_begin  = String(this.today.getMonth() + 1) + '/' + String(this.today.getDate()) + '/' + this.today.getFullYear();
  Week_end = String(this.tomorrow.getMonth() + 1) + '/' + String(this.tomorrow.getDate()+7) + '/' + this.tomorrow.getFullYear();
  constructor() { }

  ngOnInit() {
    // this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    console.log(this.today + " !!!!!!!!!!!!!!")
  }
  

}
