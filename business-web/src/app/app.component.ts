import { Component, HostListener, ViewChild, Host, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]
})
export class AppComponent {
  title = 'ResTaskest - Restaurant Task Done Fastest';

  constructor(@Inject(DOCUMENT) document) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.getElementById('navbar');
    if (window.scrollY <= 150) {
      
      element.classList.add('sticky');
    } else {
       element.classList.remove('sticky'); 
    }
 }
}
