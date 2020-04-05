import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanService {
  private defaultPlan ={
    amount :'0',
    description:'trial plan',
    currency:'CAD'
  }
  private  plan = new BehaviorSubject<object>(
 this.defaultPlan
  );
  currentPlan =  this.plan.asObservable();

  constructor() { }
  changePlanObj(newPlan: any) {
    this.plan.next(newPlan);
  }
}
