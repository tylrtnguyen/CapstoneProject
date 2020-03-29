import { Component, OnInit } from '@angular/core';
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { EventData } from "tns-core-modules/data/observable";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
  selector: 'ns-employee-update-inventory',
  templateUrl: './employee-update-inventory.component.html',
  styleUrls: ['./employee-update-inventory.component.css']
})
export class EmployeeUpdateInventoryComponent implements OnInit {
  ifAndroid: Boolean;
  ifIOS: Boolean;

  item1 = "Canned Chilli (cans)"
  item2 = "Wild Rice (lbs)"
  item3 = "Canned Red Beans (cans)"
  item4 = "Canned Italian Tomato (cans)"

  quantity1 = 18
  quantity2 = 40
  quantity3 = 16
  quantity4 = 12
  public years: Array<number> = [1980, 1990, 2000, 2010, 2020];
  public onSelectedIndexChanged(args: EventData) {
    const picker = <ListPicker>args.object;
    console.log(`index: ${picker.selectedIndex}; item" ${this.years[picker.selectedIndex]}`);
}
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
