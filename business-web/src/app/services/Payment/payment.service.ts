import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ManagerService} from '../Manager/manager.service';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private uri ="https://restaskest-api.herokuapp.com";
  private authToken :any;
  private message = new Subject<string>();
  constructor( private http : HttpClient , private router : Router , private managerService : ManagerService ) {

  }
  getMessage() {return this.message.asObservable();}
  paymentHandler(token, plan){
    this.authToken = this.managerService.getToken();
    console.log(this.authToken);
    const payment = {
      stripe_token : token,
      plan: plan
    }
    return this.http.post<any>(`${this.uri}/api/payment`, payment, {headers:{'Authorization' : `Bearer ${this.authToken}`}}).subscribe( res =>{
        if (res.success){
          console.log('Successfully make a payment');
          console.log(res.data);
          this.message.next(
          `Your payment has processed successfully
          here is some detail:
          name: ${res.data.description}
          price: ${res.data.amount / 100}`);
          console.log(this.message);
        }
    },error => {
      console.log(error); });
  }
}
