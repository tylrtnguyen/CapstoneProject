import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  schedule(){
    this.router.navigateByUrl("/employee-schedule");
  }

}
