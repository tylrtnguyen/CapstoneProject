import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  // tslint:disable-next-line: variable-name
  private restaurant_id: String;
  private uri ='http://restaskest-api.herokuapp.com/api';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNDRkNzFkNTUxN2U0MGI1NTk3MTIxZiIsImlhdCI6MTU4MzcxMzUzNiwiZXhwIjoxNTgzNzE3MTM2fQ.n5YF0OrHCD28Di0U1VYtresXTyynlG6KSob-vOXo_xI'
  constructor(private http: HttpClient) {
   }

   getRestaurantId() {return this.restaurant_id;}
   addRestaurant(restaurant, address, pos){
    const restaurant_to_add = {
      name : restaurant,
      address,
      pos,
    }

    return this.http.post<any>(`${this.uri}/restaurant`,restaurant_to_add, { headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${this.token}` }}).subscribe( res =>{
        if( res.success) {
            console.log("successfully added restaurant!!!")
            console.log(res.data);
            console.log(res.data._id);
            this.restaurant_id = res.data._id;
          }
    }, error => { console.log(error)});
   }
}
