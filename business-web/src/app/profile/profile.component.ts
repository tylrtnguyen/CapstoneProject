import { Component, OnInit, Output, Input, HostListener, Host  } from '@angular/core';
import { async } from '@angular/core/testing';
import {Router, Route} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import * as Stripe from 'stripe';

declare var StripeCheckout : StripeCheckoutStatic; // include stripe checkout
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   public profile: FormGroup;

  @Input() amount; // amount of product
  @Input() description; // description of product
  handler: StripeCheckoutHandler;

  confirmation : any;
  loading = false;
  constructor( private fb: FormBuilder, private router: Router) {

    this.profile = fb.group({
      fullname: ['', Validators.required],
      restaurant: ['', Validators.required],
      pos : ['', Validators.required]
    });
  }
  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key:'pk_test_C753uGy3APeqonNZTgHpHdOl00pdcyuNoM',
      source : async (source) =>{
          this.loading = true;
          console.log("Charged already!!!");
          this.loading = false;
      }
    });

  }

   // open the checkout handler
   async  checkout(e:any) {
    const user = {'name' : "Quan Tri Thanh" , 'email' : 'trithanhhandsome@gmail.com'};
    this.handler.open({
      name : 'Restaskest',
      description:"We will not charged before you've registered for our package",
      amount : 0,
      email : user.email,
    });
  }

}
