import { Component, OnInit, Output, Input, HostListener, Host, ViewChild, ElementRef  } from '@angular/core';
import { async } from '@angular/core/testing';
import {Router, Route} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, Form, FormGroup, FormBuilder} from '@angular/forms';
import {IgxToggleDirective, HorizontalAlignment, VerticalAlignment, ConnectedPositioningStrategy, CloseScrollStrategy} from 'igniteui-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   public profile: FormGroup;

   @ViewChild(IgxToggleDirective,{static:false}) igxtoggle: IgxToggleDirective;
   @ViewChild('button',{static:false}) igxButton: ElementRef;

  public positionSettings = {
    horizontalStartPoint : HorizontalAlignment.Left,
    verticalStartPoint: VerticalAlignment.Bottom

  }

  public overlaySettings = {
    closeOnOutsideClick: false,
    modal: false,
    positionStrategy: new ConnectedPositioningStrategy(this.positionSettings),
  };


  toggleForm(){
    this.overlaySettings.positionStrategy.settings.target = this.igxButton.nativeElement;
    this.igxtoggle.toggle(this.overlaySettings);
  }
  constructor( private fb: FormBuilder, private router: Router) {

    this.profile = fb.group({
      fullname: ['', Validators.required],
      restaurant: ['', Validators.required],
      pos : ['']
    });
  }
  ngOnInit() {
  }

  click = () => {
    this.router.navigate(['checkout']);
  }


}

