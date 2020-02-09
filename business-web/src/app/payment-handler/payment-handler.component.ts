import { Component, OnInit, Output, Input, HostListener, Host, ViewChild, ElementRef  } from '@angular/core';
import { async } from '@angular/core/testing';
import {Router, Route} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import { promise } from 'protractor';

declare var  Stripe : stripe.StripeStatic;

@Component({
  selector: 'app-payment-handler',
  templateUrl: './payment-handler.component.html',
  styleUrls: ['./payment-handler.component.css']
})
export class PaymentHandlerComponent implements OnInit {

  @Input() amount; // amount of product
  @Input() description; // description of product
  @ViewChild('cardElement',{static:true}) cardElement: ElementRef;

  stripe;
  card;
  cardError;


  confirmation: any;
  loading = false;

  constructor() { }

  ngOnInit() {

    this.stripe = Stripe('pk_test_C753uGy3APeqonNZTgHpHdOl00pdcyuNoM');
    const element = this.stripe.elements();

    this.card = element.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({error}) =>{
      this.cardError = error && error.message;
    });

  }


  async handleForm(e) {
    e.preventDefault();

    const {source, error} = await this.stripe.createSource(this.card);

    if (error) {
        const cardError = error.message;

    } else {

      this.loading = true;
      const user = {'email':'trithanhhandsome@gmail.com','name':'QuanTriThanh'};
      this.confirmation = new Promise((resolve)=>{
          setTimeout(()=>{
            resolve("Success!!");
          },250);
      })
      this.confirmation.then((result) => {
          console.log(result);
      }).catch((err) => {
        console.log(err);
      });
      this.loading = false;
      }
    }
}

