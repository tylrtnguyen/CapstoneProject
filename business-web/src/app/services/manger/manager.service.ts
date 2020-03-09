import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private uri ="http://restaskest-api.herokuapp.com";
  // tslint:disable-next-line: max-line-length
  private token :string;
  private tokenTimer: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient , private router : Router) { }

  getToken(){return this.token}
  getAuthStatus() {return this.isAuthenticated}
  getAuthStatusListener() {return this.authStatusListener}


  register(fName,lName, email, password,name,address,pos) {
      const manager_to_add = {
        fName,
        lName,
        email,
        password,
        restaurantName : name,
        restaurantAddress:address,
        pos
      }
      return  this.http.post<any>(`${this.uri}/register`, manager_to_add, {headers: {'Content-Type':'application/json'}}).subscribe(res => {
              if(res.success)
              {
                  console.log("Successfully Added a manager!!!");
                  console.log(res.data);
                  this.router.navigate(['checkout']);
              }
        }, error => {
            console.log(error);
            this.authStatusListener.next(false);
        })

      };

  }

