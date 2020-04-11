import { Component, OnInit } from "@angular/core";
import {
    ModalDialogService,
    ModalDialogParams
} from "nativescript-angular/modal-dialog";
@Component({
    selector: "ns-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
    constructor(public params: ModalDialogParams) {}

    ngOnInit() {}
   
}
