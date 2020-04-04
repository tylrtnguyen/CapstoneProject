import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControlName, Validators,FormControl} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {ManagerService} from '../../services/Manager/manager.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading : Boolean = false;
  login : FormGroup;
  private authStatusSub : Subscription;
  emailFormControl =  new FormControl('' , [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl =  new FormControl('' , [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(private fb: FormBuilder,  private router: Router, private managerSerivce : ManagerService) {
    this.login = fb.group({
      email : ['',[
        Validators.required,
        Validators.email
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    })

   }

  ngOnInit() {
    this.authStatusSub = this.managerSerivce.getAuthStatusListener().subscribe(
      authStatus => {
          this.isLoading = false;
      }
    )
  }

  onLogin(email, password)
  {
    console.log(email)
    console.log(password)
    this.isLoading = true;
    this.managerSerivce.login(email.value, password.value);
  }
  onDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
}
