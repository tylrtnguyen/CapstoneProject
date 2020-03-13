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
  constructor(private http: HttpClient) {
   }



}
