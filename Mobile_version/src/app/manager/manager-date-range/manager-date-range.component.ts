import { Component, OnInit ,Injectable, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "tns-core-modules/ui/page";
import { CalendarSelectionMode } from "nativescript-ui-calendar";
import * as applicationModule from "tns-core-modules/application";
import { RadCalendarComponent } from "nativescript-ui-calendar/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-manager-date-range',
  templateUrl: './manager-date-range.component.html',
  styleUrls: ['./manager-date-range.component.css']
})
export class ManagerDateRangeComponent implements OnInit {
  constructor(private routerExtensions: RouterExtensions , private page : Page) { }
  @ViewChild("myCalendar", { static: false }) _calendar: RadCalendarComponent;
  ngOnInit() {
    this.page.actionBarHidden = true;
  }
  get selectionMode() {
    return CalendarSelectionMode.Range
  }
  goBack() {
    this.routerExtensions.backToPreviousPage();
}

}
