import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { User } from "../../share-services/User";
import * as Toast from "nativescript-toast";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ShareService } from "~/app/share-services/share.service";
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

    constructor(private page: Page, private router: Router,public modal : ModalDialogService,private vcRef:ViewContainerRef, public share:ShareService) {
        this.page.actionBarHidden = true;
        this.user = new User();
        // this.user.email = "foo2@foo.com";
        // this.user.password = "foo";
    }

    ngOnInit() {}
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

         
        const matchEmail = this.share.employees_info.filter(key=>key.email === this.user.email)
        console.log("Match or not : " + JSON.stringify(matchEmail))
        if(matchEmail.length ==0)
        {
            console.log("There is no match email")
        }
        else if( matchEmail.length > 0)
        {
            console.log("There is a match  : " + JSON.stringify(matchEmail))
            this.share.Login(matchEmail)
            this.router.navigateByUrl('/manager-home')
        }
        else{
            console.log("Something went wrong")
        }
        if(this.user.email === 'vuabaybune@gmail.com' && this.user.password === 'Thanhquan123')
        {
            console.log("Log in as manager")
            this.router.navigateByUrl('/manager-home')
        }
        else if(this.user.email === 'employee@gmail.com' && this.user.password === 'employee123')
        {
            console.log("Log in as employee")
            this.router.navigateByUrl('/employee-home')
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
            animation:true,
            viewContainerRef: this.vcRef,
            
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
