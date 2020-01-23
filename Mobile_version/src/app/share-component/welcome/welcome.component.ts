import { Component, OnInit } from '@angular/core';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
  }

}
