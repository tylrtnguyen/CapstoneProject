import { Component, OnInit } from '@angular/core';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
  selector: 'ns-employee-inventory',
  templateUrl: './employee-inventory.component.html',
  styleUrls: ['./employee-inventory.component.css']
})
export class EmployeeInventoryComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;
  inventory_data = [
    {
      name: 'Something',
      quantity : 12
    },
    {
      name: 'Something1',
      quantity : 123
    },
    {
      name: 'Something2',
      quantity : 124
    },
    {
      name: 'Something3',
      quantity : 125
    },
    {
      name: 'Something4',
      quantity : 126
    },
  ]
  constructor() { }

  ngOnInit() {
    if (isAndroid) {
      this.ifAndroid = true;
      this.ifIOS = false;
  } else if (isIOS) {
      this.ifIOS = true;
      this.ifAndroid = false;
  }
  }

}
