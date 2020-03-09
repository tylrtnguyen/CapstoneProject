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
import { User } from "../../share-services/User";
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
    user: User;

    @ViewChild("password", { static: false }) password: ElementRef;
    @ViewChild("confirmPassword", { static: false })
    confirmPassword: ElementRef;

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

    ngOnInit() {
        this.http
            .get(this.share.url + "employee", {
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    this.share.employees_info = result["data"];
                },
                error => {
                    console.log(error);
                }
            );
        this.http
            .get(this.share.url + "manager", {
                headers: this.share.APIHeader()
            })
            .subscribe(
                result => {
                    this.share.managers_info = result["data"];
                },
                error => {
                    console.log(error);
                }
            );
    }
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
                this.loginManger();
            } else {
                this.loginEmployee();
            }
        } else {
            this.register();
        }
    }

    loginManger() {
        this.http
            .post(
                this.share.urlLoginManager,
                { email: this.user.email, password: this.user.password },
                { headers: this.share.APIHeader() }
            )
            .subscribe(
                result => {
                    this.share.currentUser = result;
                    this.router.navigateByUrl('/manager-home')
                },
                error => {
                    console.log(JSON.stringify(error));
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
                    this.router.navigateByUrl('/employee-home')
                },
                error => {
                    console.log(error);
                }
            );
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            Toast.makeText(
                "Your password does not match, please try again !",
                "short"
            ).show();

            return;
        }
        console.log("Register clicked");
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
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }
}
