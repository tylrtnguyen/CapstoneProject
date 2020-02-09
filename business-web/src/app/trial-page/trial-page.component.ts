import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import {Route,Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

export class customErrorMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty ||   control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-trial-page',
  templateUrl: './trial-page.component.html',
  styleUrls: ['./trial-page.component.css']
})
export class TrialPageComponent implements OnInit {


  matcher =new customErrorMatcher();




  user :FormGroup;
  constructor(private fb: FormBuilder, private router: Router ) {
    this.user = fb.group({
      email : ['', [
        Validators.required,
        Validators.email,
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    });
   }

  ngOnInit() {
  }
  signUp() {
    this.router.navigate(['profile']);
  }
}
