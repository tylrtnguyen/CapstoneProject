import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-employee-inventory',
  templateUrl: './employee-inventory.component.html',
  styleUrls: ['./employee-inventory.component.css']
})
export class EmployeeInventoryComponent implements OnInit {
  item1 = "Canned Chilli (cans)"
  item2 = "Wild Rice (lbs)"
  item3 = "Canned Red Beans (cans)"
  item4 = "Canned Italian Tomato (cans)"

  quantity1 = 18
  quantity2 = 40
  quantity3 = 16
  quantity4 = 12
  constructor() { }

  ngOnInit() {
  }

}
