import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanService implements CanActivate {

  private  plan = new BehaviorSubject({});
  private  checkPlan : boolean = false;
  currentPlan = this.plan.asObservable().pipe(distinctUntilChanged());
  private small = {
    amount:999,
    currency: 'cad',
    description: 'Small plan of Restaskest Application',
  }
  private medium = {
    amount:1599,
    currency: 'cad',
    description: 'Medium plan of Restaskest Application'

  }
  private large = {
    amount:2699,
    currency: 'cad',
    description: 'Large plan of Restaskest Application'

  }
  constructor( private router: Router) {
   }
  private changePlanObj( planName:number ) {
    switch (planName){
      case 1 :{
        this.plan.next(this.small);
        this.checkPlan = true;
        break;
      }
      case 2  :{
        this.plan.next(this.medium);
        this.checkPlan = true;
        break;
      }
      case 3 : {
        this.plan.next(this.large);
        this.checkPlan = true;
        break;
      }
      default: {
        this.checkPlan=false;
        break;
      }
    }
  }
  submitPlan(planNumb:number) {
    this.changePlanObj(planNumb);
  }

  getCurrentPlan() {return this.currentPlan; }

  canActivate (route: ActivatedRouteSnapshot) {
    if(!this.checkPlan){
      this.router.navigate(['/pricing'])
      return false;
    }
    return true;
  }

}
