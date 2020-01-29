import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
  selector: 'ns-manager-tab-manager',
  templateUrl: './manager-tab-manager.component.html',
  styleUrls: ['./manager-tab-manager.component.css']
})
export class ManagerTabManagerComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  constructor() { }
  
  ngOnInit() {
    if(isAndroid)
    {
      this.ifAndroid = true
      this.ifIOS = false
    }
    else if(isIOS)
    {
      this.ifIOS = true
      this.ifAndroid = false
    }
  }

  onSelectedIndexchanged(args: SelectedIndexChangedEventData) {
    let newIndex = args.newIndex;
}
}
