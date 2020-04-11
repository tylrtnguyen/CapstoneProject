import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import {Route, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {ManagerService} from '../../services/Manager/manager.service';
import {PosIntegration} from '../../pos-integration';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../features/dialog/dialog.component';

export class customErrorMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent || isSubmitted);
  }
}

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-trial-page',
  templateUrl: './trial-page.component.html',
  styleUrls: ['./trial-page.component.css']
})
export class TrialPageComponent implements OnInit {


  matcher = new customErrorMatcher();
  loading = false;
  user: FormGroup;
  profile: FormGroup;
  matchingPass: Boolean;
  message: string;
  posLists: PosIntegration[] = [
    {value: 'TouchBistro' , view:'Touch Bistro'},
    {value: 'Lightspeed', view:'Lightspeed'}
  ];

  constructor(private fb: FormBuilder, private router: Router, private managerService: ManagerService, private snackBar: MatSnackBar, private dialog: MatDialog  ) {
    this.user = fb.group({
      email : ['', [
        Validators.required,
        Validators.email,
      ]],
      password : ['',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]],
      confirm : [''],
      fName: ['', [ Validators.required]],
      lName: ['', [ Validators.required]],
    }, {validator: this.checkingPassword });

    this.profile = fb.group({
      restaurant: ['', Validators.required],
      address :['', Validators.required],
      pos : ['', Validators.required],
     });
   }

  ngOnInit() {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width:' 600px',
      height:' 350px',
      data:{message: this.message}
    });

    dialogRef.afterClosed().subscribe(result =>{
        console.log('The dialog was closed');
        this.router.navigate(['/main']);
    });

  }


  checkingPassword(group: FormGroup) {
      let password = group.get('password').value;
      let confirm = group.get('confirm').value;

      return password === confirm ? null : { notSame : true }
  }

  async onClick(fName,lName,restaurant,address,pos,email,password,confirm) {

     // tslint:disable-next-line: max-line-length
     this.loading= true;
     const response = await this.managerService.register(fName.value,lName.value,email.value,password.value,restaurant.value,address.value,pos.value);
     this.managerService.getMessage().subscribe((data) => {
        this.message = data;
        this.openDialog();

      });
      this.loading= false;

  }
}
