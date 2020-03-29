import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ViewContainerRef
} from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { User } from "../../model/User";
import * as Toast from "nativescript-toast";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ShareService } from "~/app/share-services/share.service";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    isLoggingIn = true;
    manager_id: String;
    user: User;
    @ViewChild("password", { static: false }) password: ElementRef;

    constructor(
        private page: Page,
        private router: Router,
        public modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        public share: ShareService,
        private http: HttpClient
    ) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    ngOnInit() {}
    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit(isManager: Boolean) {
        if (!this.user.email || !this.user.password) {
            Toast.makeText(
                "Please provide both an email address and password"
            ).show();
            return;
        }
        if (this.isLoggingIn) {
            if (isManager) {
                this.loginManager();
            } else {
                this.loginEmployee();
            }
        } else {
            console.log("something went wrong");
        }
    }

    loginManager() {
        this.http
            .post(
                this.share.urlLoginManager,
                { email: this.user.email, password: this.user.password },
                { headers: this.share.APIHeader() }
            )
            .subscribe(
                result => {
                    this.share.currentUser = result;
                    this.router.navigateByUrl("/manager-home");
                },
                error => {
                    Toast.makeText(
                        "Email or password is incorrect",
                        "short"
                    ).show();
                }
            );
    }

    loginEmployee() {
        this.http
            .post(
                this.share.urlLoginEmployee,
                { email: this.user.email, password: this.user.password },
                { headers: this.share.APIHeader() }
            )
            .subscribe(
                result => {
                    this.share.currentUser = result;
                    this.router.navigateByUrl("/employee-home");
                },
                error => {
                    Toast.makeText(
                        "Email or password is incorrect",
                        "short"
                    ).show();
                }
            );
    }

    forgotPassword() {
        let options = {
            context: {},
            fullscreen: false,
            animation: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ForgotPasswordComponent, options).then(result => {
            console.log(result);
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
}
