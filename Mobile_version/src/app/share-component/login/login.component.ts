import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from 'tns-core-modules/ui/page/page';
@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, public page: Page) { }
  textLabel = "";
  ngOnInit(){
    this.page.actionBarHidden = true
    console.log("Welcome to the login page")
  }
  welcome=()=>{
    console.log("going back to the welcome page")
    this.router.navigateByUrl('')
  }

}

