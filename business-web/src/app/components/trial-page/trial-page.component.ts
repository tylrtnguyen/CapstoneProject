import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {ManagerService} from '../../services/Manager/manager.service';
import {PosIntegration} from '../../pos-integration';

export class customErrorMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent || isSubmitted);
  }
}

@Component({
  selector: 'app-trial-page',
  templateUrl: './trial-page.component.html',
  styleUrls: ['./trial-page.component.css']
})
export class TrialPageComponent implements OnInit {


  matcher = new customErrorMatcher();
  loading = false;
  user: FormGroup;
  profile: FormGroup;
  matchingPass: Boolean;
  posLists: PosIntegration[] = [
    {value: 'TouchBistro' , view:'Touch Bistro'},
    {value: 'Lightspeed', view:'Lightspeed'}
  ];

  constructor(private fb: FormBuilder, private router: Router, private managerService: ManagerService  ) {
    this.user = fb.group({
      email : ['', [
        Validators.required,
        Validators.email,
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.{8,})')
      ]],
      confirm : [''],
      fName: ['', [ Validators.required]],
      lName: ['', [ Validators.required]],
    }, {validator: this.checkingPassword });

    this.profile = fb.group({
      restaurant: ['', Validators.required],
      address :['', Validators.required],
      pos : ['', Validators.required],
     });
   }

  ngOnInit() {
  }

  checkingPassword(group: FormGroup) {
      let password = group.get('password').value;
      let confirm = group.get('confirm').value;

      return password === confirm ? null : { notSame : true }
  }

  onClick(fName,lName,restaurant,address,pos,email,password,confirm) {
      this.managerService.register(fName.value,lName.value,email.value,password.value,restaurant.value,address.value,pos.value);
  }
}
