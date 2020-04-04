import { Component, OnInit, Inject } from '@angular/core';
import {ManagerService} from '../../../services/Manager/manager.service';
import {DOCUMENT} from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:Boolean
  constructor(private managerSerivice: ManagerService, @Inject(DOCUMENT) private document:Document) {

  }

  ngOnInit() {

  }

}
