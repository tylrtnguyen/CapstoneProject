import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import { error } from 'protractor';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private uri ="https://restaskest-api.herokuapp.com";
  // tslint:disable-next-line: max-line-length
  private token : string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient , private router : Router) { }

  getToken(){return this.token}
  getAuthStatus() {return this.isAuthenticated}
  getAuthStatusListener() {return this.authStatusListener.asObservable();}

  login(email, password){
    const credentials = {
      email,
      password,
    }

    return this.http.post<{token: string, expiresIn: number, role: string, userId: string}>(`${this.uri}/login/manager`,credentials,{headers:{'Content-Type':'application/json'}}).subscribe(res=>{
        const token = res.token;
        this.token = token;
        if (token)
        {
          if (res.role === 'manager')
          {
            const id = res.userId;
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000 ) ;
            this.saveAuthData(token, expirationDate);
            console.log(expirationDate);
            this.router.navigate(['checkout']);
          }
        }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['main']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  autoAuthUser(){
      const authInformation = this.getAuthData();
      if(!authInformation){
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expiration.getTime();
      // check if token is already expires
      if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
      }

  }

  register(fName,lName, email, password,name,address,pos) {
      const manager_to_add = {
        fName,
        lName,
        email,
        password,
        restaurantName : name,
        restaurantAddress: address,
        pos
      }
      return  this.http.post<any>(`${this.uri}/register`, manager_to_add, {headers: {'Content-Type':'application/json'}}).subscribe(res => {
              if(res.success)
              {
                  console.log('Successfully Added a manager!!!');
                  console.log(res.data);
                  this.router.navigate(['checkout']);
              }
        }, error => {
            console.log(error);
            this.authStatusListener.next(false);
        })

      };


  private setAuthTimer(duration: number) {
    console.log('Setting timer:' + duration);
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000); // because setTimeout work in millisecond
  }

  private saveAuthData(token, expirationDate){
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate)
    {
      return;
    }
    return{
        token: token,
        expiration: new Date(expirationDate),
    }
  }


  }
