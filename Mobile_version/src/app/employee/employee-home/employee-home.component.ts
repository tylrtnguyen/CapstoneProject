import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";

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
  onSelectedIndexchanged(args: SelectedIndexChangedEventData) {
    let newIndex = args.newIndex;
}

}
