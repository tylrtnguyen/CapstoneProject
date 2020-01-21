import { Component, OnInit } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";

import {
    RadCalendar,
    CalendarEvent,
    CalendarSelectionEventData
} from "nativescript-ui-calendar";
@Component({
    selector: "ns-manager-calendar",
    templateUrl: "./manager-calendar.component.html",
    styleUrls: ["./manager-calendar.component.css"]
})
export class ManagerCalendarComponent implements OnInit {
    current_date;
    events: Array<CalendarEvent>;
    listEvent: Array<CalendarEvent>;
    location: String = "Click to choose your inital location";
    constructor() {}
    ngOnInit() {
        //setting up the date and stuff
        let now = new Date();
        let startDate: Date, endDate: Date, event: CalendarEvent;
        startDate = new Date(now.getFullYear(), now.getMonth(), 22);
        endDate = new Date(now.getFullYear(), now.getMonth(), 23);
        //create a event list
        let events: Array<CalendarEvent> = new Array<CalendarEvent>();

        //turn it into an event by concact startdate enddate and event and more !!
        event = new CalendarEvent(
            "Testing out the event date tutorial",
            startDate,
            endDate
        );

        //pushing events to the calendar
        events.push(event);
        this.events = events;
    }

    displayActionDialog() {
      // >> action-dialog-code
      let options = {
          title: "Choose your location",
          cancelButtonText: "Cancel",
          actions: [
              "Hell Kitchen",
              "Restaurant number 2",
              "Restaurant number 3",
              "Restaurant number 4"
          ]
      };
      //getter and setter using promise
      action(options).then((result)=>{
        this.location = result;
        console.log("Testing")

      });
      
      // << action-dialog-code
  }
    //here is where we put all our event in the [eventSource]
    get eventSource() {
        return this.events;
    }

    //here is where to write all the event in a list
    get ListEvent(): Array<CalendarEvent> {
        return this.listEvent;
    }
    set ListEvent(value) {
        this.listEvent = value;
    }
    //getting the value out of the calendar
    onDateSelected(args: CalendarSelectionEventData) {
        const calendar: RadCalendar = args.object;
        const date: Date = args.date;
        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const day_value = weekdays[date.getDay()];
        const date_value = date.getDate();
        const month_value = date.getMonth() + 1;
        const year_value = date.getFullYear();
        const selected_time = `${day_value} ${date_value} ${month_value} ${year_value}`;

        const events: Array<CalendarEvent> = calendar.getEventsForDate(date);

        this.current_date = selected_time;
        this.ListEvent = events;
    }
}
