import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { action } from "tns-core-modules/ui/dialogs";
import {
    RadCalendar,
    CalendarEvent,
    CalendarSelectionEventData
} from "nativescript-ui-calendar";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { ShareService } from "../../share-services/share.service";

@Component({
    selector: "ns-manager-calendar",
    templateUrl: "./manager-calendar.component.html",
    styleUrls: ["./manager-calendar.component.css"]
})
export class ManagerCalendarComponent implements OnInit {
    current_date;
    location: String = "Choose your location";
    height: String;

    @Output() timeEvent = new EventEmitter<string>();
    send_current_time() {
        this.timeEvent.emit(this.current_date);
    }
    constructor(public share: ShareService) {}
    ngOnInit() {
        this.calendar_size();
        
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

            if(result === 'Cancel'){
                this.location = options.title
            }else{
                this.location = result;
            }
            
        });

    }

  

   

    //getting the value out of the calendar
    onDateSelected(args: CalendarSelectionEventData) {
        //get the selected date using RadCalendar argument
        const calendar: RadCalendar = args.object;
        const date: Date = args.date;
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const day_value = weekdays[date.getDay()];

        const date_value = ("0" + date.getDate()).slice(-2);
        const month_value = months[date.getMonth()];
        const year_value = date.getFullYear();
        const selected_time = `${day_value} ${month_value} ${date_value} ${year_value}`;

        //put the selected event in a temp variable
        // const events: Array<CalendarEvent> = calendar.getEventsForDate(date);

        //output the selected date and event
        this.current_date = selected_time;

        this.send_current_time();
    }

    calendar_size() {
        if (isIOS) {
            this.height = "15%";
        }

    }
}
