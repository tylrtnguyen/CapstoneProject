import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ManagerService} from '../Manager/manager.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private uri ="https://restaskest-api.herokuapp.com";
  private authToken :any;
  constructor( private http : HttpClient , private router : Router , private managerService : ManagerService ) {

   }

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

        }
    },error => {
      console.log(error); });
  }
}
