import { Component, OnInit, Output, Input, HostListener, Host  } from '@angular/core';
import { async } from '@angular/core/testing';
import * as Stripe from 'stripe';
declare var StripeCheckout : StripeCheckoutStatic; // include stripe checkout

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  @Input() amount; // amount of product
  @Input() description; // description of product

  handler: StripeCheckoutHandler;

  confirmation : any;
  loading = false;


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

