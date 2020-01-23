import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'ns-manager-schedule',
  templateUrl: './manager-schedule.component.html',
  styleUrls: ['./manager-schedule.component.css']
})
export class ManagerScheduleComponent implements OnInit {

  message : String;
  dataItems = [
    {'name' : 'Thanh Quan','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'Manager', 'date' : 'Tuesday 21 1 2020'},
    {'name' : 'Thay Ba','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'Manager', 'date' : 'Wednesday 22 1 2020'},
    {'name' : 'Tu Nguyen','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'Janitor' , 'date' : 'Tuesday 21 1 2020'},
    {'name' : 'Thanh Dep Trai','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'CEO', 'date' : 'Wednesday 22 1 2020'},
    {'name' : 'Quang Pham','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'Striper 1' , 'date' : 'Wednesday 22 1 2020'},
    {'name' : 'Thong Nguyen','start_time' : '15:00', 'end_time' : '17:00', 'position' : 'Striper 2' ,'date' : 'Wednesday 22 1 2020'},
  ]
  temp_dataItems = []
  receive_current_time($event) {
    this.message = $event
    this.filter()
  }
  
  filter(){
    
    console.log(this.message)
    const filtered_word = this.dataItems.filter(employee => employee.date === this.message)
    console.log(filtered_word)
    this.temp_dataItems = filtered_word

  }

  

  constructor(public router : Router) { }

  ngOnInit() { }

  home(){
    this.router.navigateByUrl('/manager-home')
  }
}
