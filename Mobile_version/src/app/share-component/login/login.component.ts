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
    ){
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    ngOnInit() {
        this.http.get(this.share.url+"employee", {headers: this.share.APIHeader()}).subscribe(
            result =>{
                this.share.employees_info = result['data'];
            },
            error => {
                console.log(error)
            }
        )
        this.http.get(this.share.url+"manager", {headers: this.share.APIHeader()}).subscribe(
            result =>{
                this.share.managers_info = result['data'];
            },
            error => {
                console.log(error)
            }
        )
    }
    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            Toast.makeText(
                "Please provide both an email address and password"
            ).show();
            return;
        }
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        const matchEmployeeEmail = this.share.employees_info.filter(
            key => key.email === this.user.email
        );
        const matchManagerEmail = this.share.managers_info.filter(
            key => key.email === this.user.email
        );
        console.log(matchEmployeeEmail)
        console.log(matchManagerEmail)


        if (matchEmployeeEmail.length == 0 && matchManagerEmail.length == 0) {
            console.log("There is no match email");
            Toast.makeText('Wrong email or password !!!').show();
        } else if (matchEmployeeEmail.length > 0) {
            console.log("There is a match  : " + JSON.stringify(matchEmployeeEmail));
            if(this.user.password === matchEmployeeEmail[0].password){
                this.share.Login(matchEmployeeEmail);
                this.router.navigateByUrl("/employee-home");
            }else{
                Toast.makeText('Wrong password !!!!').show()
            }
        } else if (matchManagerEmail.length > 0) {
            console.log("There is a match  : " + JSON.stringify(matchManagerEmail));
            if(this.user.password === matchManagerEmail[0].password){
                this.share.Login(matchManagerEmail);
                this.router.navigateByUrl("/manager-home");
            }else{
                Toast.makeText('Wrong password !!!!').show()
            }
        } else {
            console.log("Something went wrong");
        }
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            Toast.makeText(
                "Your password does not match , please try again !",
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
