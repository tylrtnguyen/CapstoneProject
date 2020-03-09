import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../../user';
import {ManagerService} from '../../services/manger/manager.service';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {PosIntegration} from '../../pos-integration';

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

  newUser: User;
  matcher = new customErrorMatcher();
  loading = false;
  user: FormGroup;
  profile: FormGroup;
  matchingPass: Boolean;
  posLists: PosIntegration[] = [
    {value: 'TouchBistro' , view:'Touch Bistro'},
    {value: 'Lightspeed', view:'Lightspeed'}
  ];

  constructor(private fb: FormBuilder, private router: Router, private managerService: ManagerService , private restaurantService : RestaurantService ) {
    this.user = fb.group({
      email : ['', [
        Validators.required,
        Validators.email,
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      confirm : ['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      fName:['',[Validators.required]],
      lName:['',[Validators.required]],
    });
    this.profile = fb.group({

      restaurant: ['', Validators.required],
      address :['',Validators.required],
      pos : ['',Validators.required],
     });
   }

  ngOnInit() {
  }

  checkingPassword = (password, confirm) => {
    if (password == confirm) {
      this.matchingPass = true;
      return true;
    }
    else {
        this.matchingPass = false;
        return false;
    }
  }

  onClick(fName,lName,restaurant,address,pos,email,password,confirm) {


      if (this.checkingPassword(password.value, confirm.value))
      {
          this.managerService.register(fName.value,lName.value,email.value,password.value,restaurant.value,address.value,pos.value);

      }
  }
}
