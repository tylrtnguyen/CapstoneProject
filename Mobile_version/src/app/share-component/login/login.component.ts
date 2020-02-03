import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }
  textLabel = "";
  ngOnInit(){
    console.log("Welcome to the login page")
  }
  welcome=()=>{
    console.log("going back to the welcome page")
    this.router.navigateByUrl('')
  }

}

