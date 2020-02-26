import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { Router } from '@angular/router';

@Component({
  selector: 'ns-manager-tab-manager',
  templateUrl: './manager-tab-manager.component.html',
  styleUrls: ['./manager-tab-manager.component.css']
})
export class ManagerTabManagerComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  constructor(private page: Page, public router : Router) {
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
  route_link(){
    console.log('Route demo')
    this.router.navigateByUrl('/manager-schedule')
  }
}
