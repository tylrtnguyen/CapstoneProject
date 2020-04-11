import { Component, OnInit, Output, Input, HostListener, Host, ViewChild, ElementRef  } from '@angular/core';
import { async } from '@angular/core/testing';
import {Router, Route} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder, EmailValidator} from '@angular/forms';
import {ManagerService} from '../../services/Manager/manager.service';
import {ServicePlanService} from '../../services/ServicePlan/service-plan.service';
import {PaymentService} from '../../services/Payment/payment.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../features/dialog/dialog.component';

export interface DialogData {
  message: string;
}

declare var  Stripe : stripe.StripeStatic;

@Component({
  selector: 'app-payment-handler',
  templateUrl: './payment-handler.component.html',
  styleUrls: ['./payment-handler.component.css']
})
export class PaymentHandlerComponent implements OnInit {
  public checkoutForm :FormGroup;

  @Input() amount :any  ; // amount of product
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
  message: string;

  constructor(private fb:FormBuilder, private managerService: ManagerService, private ServicePlan : ServicePlanService, private paymentSerivce : PaymentService, private dialog : MatDialog, private router : Router) {
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
    this.ServicePlan.getCurrentPlan().subscribe( (plan) => this.planSub = plan);
    console.log(this.planSub);
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

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width:' 800px',
      height:' 400px',
      data:{message: this.message}
    });

    dialogRef.afterClosed().subscribe(result =>{
        console.log('The dialog was closed');
        this.router.navigate(['/main']);
    });

  }

  async handleForm(e,fullname, address, city, state, zip,email,phone) {
    e.preventDefault();
    this.managerService.autoAuthUser();
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
        this.loading = false;
    } else {
      console.log(source);
      console.log(this.planSub);
      const res = await this.paymentSerivce.paymentHandler(source.id, this.planSub);
      this.paymentSerivce.getMessage().subscribe((data)=>{
        this.message = data;
        this.openDialog();
      });
      this.loading = false;
    }
      }



}

