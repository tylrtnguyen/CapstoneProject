import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { RouterExtensions } from 'nativescript-angular/router';


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  constructor(private router:Router,private routerExtensions: RouterExtensions,private location : Location) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
    
  }
  
  profile(){
    this.router.navigateByUrl("/employee-profile")  
  }
}
