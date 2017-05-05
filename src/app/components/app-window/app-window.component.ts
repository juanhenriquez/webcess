import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'ws-app-window',
  styleUrls: ['./app-window.scss'],
  template: `
    <div class="app-window-container" #window draggable>
      <div class="app-window__bar">
        <ul class="window-icons">
          <li class="window__icon window__icon--red"></li>
          <li class="window__icon window__icon--yellow"></li>
          <li class="window__icon window__icon--green" (click)="maximizeWindow()"></li>
        </ul>
        <h6 class="window__title">{{ title }}</h6>
      </div>
      <div class="app-window__content" #windowContent></div>
    </div>
  `
})
export class AppWindowComponent implements OnInit {

  @ViewChild('window') window: ElementRef;
  @ViewChild('windowContent') windowContent: ElementRef;

  @Input() title: string = "Visual Studio Code";
  @Input() img: string = "vscode-bg.png";

  isMaximized: boolean = false;

  constructor(
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this._renderer.setStyle(
      this.windowContent.nativeElement, 
      'backgroundImage', 
      `url(/assets/img/${this.img})`
    );
  }

  maximizeWindow() {
    this.isMaximized = !this.isMaximized;

    if ( this.isMaximized ) {
      this._renderer.addClass(this.window.nativeElement, 'app-window-container--maximixed');
    } else {
      this._renderer.removeClass(this.window.nativeElement, 'app-window-container--maximixed');
    }
  }
}