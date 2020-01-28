import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";

@Component({
  selector: 'ns-manager-tab-manager',
  templateUrl: './manager-tab-manager.component.html',
  styleUrls: ['./manager-tab-manager.component.css']
})
export class ManagerTabManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelectedIndexchanged(args: SelectedIndexChangedEventData) {
    let newIndex = args.newIndex;
}
}
