import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../../services/manger/manager.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:Boolean
  constructor(private managerSerivice: ManagerService) { }

  ngOnInit() {
    this.isLogin = this.managerSerivice.getAuthStatus();
  }
  logOut()
  {
    this.managerSerivice.logout();
  }
}
