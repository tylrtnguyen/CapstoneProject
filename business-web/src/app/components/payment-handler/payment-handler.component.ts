import { Component, OnInit, Output, Input, HostListener, Host, ViewChild, ElementRef  } from '@angular/core';
import { async } from '@angular/core/testing';
import {Router, Route} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder, EmailValidator} from '@angular/forms';
import { promise } from 'protractor';
import { AutoPositionStrategy, IgxBooleanFilteringOperand } from 'igniteui-angular';
import {ManagerService} from '../../services/Manager/manager.service';
import {ServicePlanService} from '../../services/ServicePlan/service-plan.service';
import {Subscription} from 'rxjs';
import {PaymentService} from '../../services/Payment/payment.service';

declare var  Stripe : stripe.StripeStatic;

@Component({
  selector: 'app-payment-handler',
  templateUrl: './payment-handler.component.html',
  styleUrls: ['./payment-handler.component.css']
})
export class PaymentHandlerComponent implements OnInit {
  public checkoutForm :FormGroup;

  @Input() amount = 0; // amount of product
  @Input() description; // description of product
  @ViewChild('cardElement', {static:true} ) cardElement: ElementRef;


  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  }

  stripe;
  card;
  cardError;


  confirmation: any;
  loading: Boolean = false;
  planSub: any;

  constructor(private fb:FormBuilder, private managerService: ManagerService, private ServicePlan : ServicePlanService, private paymentSerivce : PaymentService) {
    this.checkoutForm = fb.group({
      fullname : ['',[Validators.required]],
      email : ['',
      [Validators.required,
      Validators.email]],
      phone : ['',[Validators.required]],
      address : ['',[Validators.required]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      zip : ['',[Validators.required]],
    });

   }

  ngOnInit() {
    this.ServicePlan.currentPlan.subscribe(plan => this.planSub = plan )
    this.stripe = Stripe('pk_test_C753uGy3APeqonNZTgHpHdOl00pdcyuNoM');
    const element = this.stripe.elements({
      fonts: [
        {
        cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
        },

      ],
      locale : 'auto'
    });

    this.card = element.create('card',{
      hidePostalCode: true
    });

    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({error}) =>{
      this.cardError = error && error.message;
    });

  }


  async handleForm(e,fullname, address, city, state, zip,email,phone) {
    e.preventDefault();
    this.loading = true;
    const owner = {
      owner : {
        name: fullname.toString().toUpperCase(),
        address: {
          line1: address.toString().toUpperCase(),
          city: city.toString().toUpperCase(),
          postal_code : zip.toString().toUpperCase(),
          state: state.toString().toUpperCase(),
          country: 'CA'
      },
        email: email
    },
  };

    const {source,error} = await this.stripe.createSource(this.card, owner);

    if (error) {
        const cardError = error.message;

    } else {
      console.log(source);
      console.log(this.planSub);
      const res = await this.paymentSerivce.paymentHandler(source.id, this.planSub);
      console.log("Server response", res);
      this.loading = false;
    }
      }



}

