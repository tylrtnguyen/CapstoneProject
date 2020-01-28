import { Component, OnInit } from "@angular/core";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { TimePicker } from "tns-core-modules/ui/time-picker/time-picker";

@Component({
    selector: "ns-manager-add-schedule",
    templateUrl: "./manager-add-schedule.component.html",
    styleUrls: ["./manager-add-schedule.component.css"]
})
export class ManagerAddScheduleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    dataItems = [
      {
          name: "Thanh Quan",
          start_time: "15:00",
          end_time: "17:00",
          position: "Manager",
          date: "Tuesday 21 1 2020"
      },
      {
          name: "Thay Ba",
          start_time: "15:00",
          end_time: "17:00",
          position: "Manager",
          date: "Wednesday 22 1 2020"
      },
      {
          name: "Tu Nguyen",
          start_time: "15:00",
          end_time: "17:00",
          position: "Janitor",
          date: "Tuesday 21 1 2020"
      },
      {
          name: "Thanh Dep Trai",
          start_time: "15:00",
          end_time: "17:00",
          position: "CEO",
          date: "Wednesday 22 1 2020"
      },
      {
          name: "Quang Pham",
          start_time: "15:00",
          end_time: "17:00",
          position: "Striper 1",
          date: "Wednesday 22 1 2020"
      },
      {
          name: "Thong Nguyen",
          start_time: "15:00",
          end_time: "17:00",
          position: "Striper 2",
          date: "Wednesday 22 1 2020"
      }
  ];


    selected_employees = []

    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2045, 4, 12);
    show_datepicker: Boolean = false;
    show_start_time: Boolean = false;
    show_end_time: Boolean = false;
    show_employee_condition: Boolean = false;
    today = new Date();
    current_day = this.today.getDay();
    current_month = this.today.getMonth()+1
    current_year = this.today.getFullYear()
    current_hour = this.today.getHours();
    current_minute = this.today.getMinutes();

    
    onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }
    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }

    show_date(){
      this.show_datepicker = !this.show_datepicker
    }
    start_time(){
      this.show_start_time = !this.show_start_time
    }
    end_time(){
      this.show_end_time = !this.show_end_time
    }
    show_employee(){
      this.show_employee_condition = !this.show_employee_condition
    }

  public onItemSelected(args: ListViewEventData) {

    // this.selected_employees.push(this.dataItems[args.index])
    let name = this.dataItems[args.index].name
    this.selected_employees.push(name)

  }
  public onItemDeselected(args: ListViewEventData) {
    let name = this.dataItems[args.index].name;
    this.selected_employees = this.selected_employees.filter(employee => employee != name )    
  }
  todayObj: Date = new Date();

    onTimeChanged(args) {
        const tp = args.object as TimePicker;

        const time = args.value;
        console.log(`Chosen time: ${time}`);
  }
}
