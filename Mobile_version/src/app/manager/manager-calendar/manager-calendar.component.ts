import { Component, OnInit,  Output, EventEmitter } from "@angular/core";
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
   

    @Output() timeEvent = new EventEmitter<string>();
    send_current_time() {
        this.timeEvent.emit(this.current_date)
    }
    constructor() {}
    ngOnInit() {

        //init new event
        let now = new Date();
        let startDate: Date, endDate: Date, event: CalendarEvent;
        startDate = new Date(now.getFullYear(), now.getMonth(), 22);
        endDate = new Date(now.getFullYear(), now.getMonth(), 23);

        //add new event
        event = new CalendarEvent(
            "Testing out the event date tutorial",
            startDate,
            endDate
        );

        //create a temp event list
        let events: Array<CalendarEvent> = new Array<CalendarEvent>();

        //pushing temp event list to the main event list
        events.push(event);
        this.events = events;
    }

    //drop down box alike
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
        action(options).then(result => {
            this.location = result;
            console.log("Testing");
        });

        // << action-dialog-code
    }


    //putting added event to the radcalendar
    get eventSource() {
        return this.events;
    }

    // getter and setter for the listEvent to show the event
    get ListEvent(): Array<CalendarEvent> {
        return this.listEvent;
    }
    set ListEvent(value) {
        this.listEvent = value;
    }

    //getting the value out of the calendar
    onDateSelected(args: CalendarSelectionEventData) {
        //get the selected date using RadCalendar argument
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

        //put the selected event in a temp variable
        // const events: Array<CalendarEvent> = calendar.getEventsForDate(date);

        //output the selected date and event
        this.current_date = selected_time;
        this.ListEvent = calendar.getEventsForDate(date);

        this.send_current_time()
    }


}
