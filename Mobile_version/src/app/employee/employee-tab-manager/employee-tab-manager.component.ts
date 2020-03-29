import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { Router } from '@angular/router';

@Component({
  selector: 'ns-employee-tab-manager',
  templateUrl: './employee-tab-manager.component.html',
  styleUrls: ['./employee-tab-manager.component.css']
})
export class EmployeeTabManagerComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  constructor(private page: Page, public router : Router) {
    // this.page.actionBarHidden = true;
  }

  ngOnInit() {
    if(isAndroid)
    {
      this.ifAndroid = true
      this.ifIOS = false
      console.log("this is android")
    }
    else if(isIOS)
    {
      this.ifIOS = true
      this.ifAndroid = false
      console.log('this is ios')
    }
  }

  onSelectedIndexchanged(args: SelectedIndexChangedEventData) {
    let newIndex = args.newIndex;
    return newIndex
  }

}
