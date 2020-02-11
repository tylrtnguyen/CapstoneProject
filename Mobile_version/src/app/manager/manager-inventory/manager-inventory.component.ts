import { Component, OnInit } from '@angular/core';
import { ShareService } from '~/app/share-services/share.service';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";

@Component({
  selector: 'ns-manager-inventory',
  templateUrl: './manager-inventory.component.html',
  styleUrls: ['./manager-inventory.component.css']
})
export class ManagerInventoryComponent implements OnInit {

  isIOS :boolean
  inventory_data = [
    {product_name: 'Pork meat' , quantity: 1000,exp: 'Dec/21/2020',seller: '100% Pig Farm',desc: 'Shitty pig meat'},
    {product_name: 'Cow meat' , quantity: 11,exp: 'Dec/21/2020',seller: '100% Cow Farm',desc: 'Shitty cow meat'},
    {product_name: 'Dog meat' , quantity: 12,exp: 'Dec/21/2020',seller: '100% Dog Farm',desc: 'Shitty dog meat'},
    {product_name: 'Bat meat' , quantity: 13,exp: 'Dec/21/2020',seller: '100% Bat Farm',desc: 'Shitty bat coronovirus meat'},
  ];
  constructor(public share :ShareService) { }
  inventory = []
  ngOnInit() {
    if(isIOS)
    {
      this.isIOS = true
    }
    else{
      this.isIOS = false
    }
    this.inventory = this.share.inventory
  }



}
