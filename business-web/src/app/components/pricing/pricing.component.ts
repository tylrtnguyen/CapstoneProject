import { Component, OnInit } from '@angular/core';
import {ServicePlanService} from '../../services/ServicePlan/service-plan.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {ManagerService} from '../../services/Manager/manager.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  small = {
    amount:999,
    currency: 'cad',
    description: 'Small plan of Restaskest Application',
  }
  medium = {
    amount:1599,
    currency: 'cad',
    description: 'Medium plan of Restaskest Application'

  }
  large = {
    amount:2699,
    currency: 'cad',
    description: 'Large plan of Restaskest Application'

  }
  authListener :boolean;
  constructor( private servicePlan : ServicePlanService, private router: Router, private managerService : ManagerService) { }

  ngOnInit() {
    this.managerService.getAuthStatusListener().subscribe(res => this.authListener = res)
  }

  choosePlan(newPlan) {
     this.servicePlan.changePlanObj(newPlan);
     if(!this.authListener) {
     this.router.navigate(['/login']);
     }
     else{
       this.router.navigate(['/checkout']);
     }
  }

}
