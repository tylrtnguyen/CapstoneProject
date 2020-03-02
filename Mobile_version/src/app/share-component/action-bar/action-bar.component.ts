import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

import { RouterExtensions } from 'nativescript-angular/router';
import { ShareService } from '~/app/share-services/share.service';


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() Title : String;
  @Input() isLogout : Boolean = false;

  constructor(private router:Router,private routerExtensions: RouterExtensions,private location : Location, private share: ShareService) { }

  ngOnInit() {
    console.log(this.isLogout)
  }

  goBack(){
    this.location.back()
    
  }
  
  profile(){
      this.router.navigateByUrl("/profile")   
  }
  logout(){
    this.share.Logout()
    this.router.navigateByUrl("/login")
  }
}
