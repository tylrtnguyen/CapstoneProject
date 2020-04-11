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


  authListener :boolean;
  constructor( private servicePlan : ServicePlanService, private router: Router, private managerService : ManagerService) { }

  ngOnInit() {
    this.managerService.autoAuthUser();
    this.authListener = this.managerService.getAuthStatus();
    console.log(this.authListener);
    console.log(this.managerService.getAuthStatusListener);
  }

  choosePlan(newPlan) {
     this.servicePlan.submitPlan(newPlan);

     if(!this.authListener) {
     this.router.navigate(['/login']);
     }
     else{
       this.router.navigate(['/checkout']);
     }
  }

}
