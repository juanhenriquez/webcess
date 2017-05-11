import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { App } from './../../models/app';

@Component({
  selector: 'ws-app-window',
  styleUrls: ['./app-window.scss'],
  template: `
    <div class="app-window-container" #window (click)="focusWindow()">
      <div class="app-window__bar" #windowBar windowBar>
        <ul class="window-icons">
          <li class="window__icon window__icon--red" (click)="closeApp()"></li>
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
  @ViewChild('windowBar') windowBar: ElementRef;
  @ViewChild('windowContent') windowContent: ElementRef;

  @Input() app: App;
  @Input() title: string;
  @Input() img: string;

  @Output() close: EventEmitter<number> = new EventEmitter<number>();

  isMaximized: boolean = false;
  isDraggableInitialized: boolean = false;

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

  closeApp() {
    this.close.emit(this.app.id);
  }

  maximizeWindow() {
    this.isMaximized = !this.isMaximized;
    if ( this.isMaximized ) {
      this.setMaximizedWindowStyles();
    } else {
      this.resetMaximizedWindowStyles()
    }
  }

  focusWindow() {
    $('.app-window-container').removeClass('focus-window');
    this._renderer.addClass(this.window.nativeElement, 'focus-window');
  }
  
  setMaximizedWindowStyles() {
    this._renderer.addClass(this.window.nativeElement, 'app-window-container--maximixed');
    this._renderer.setStyle(this.window.nativeElement, 'width', '100vw');
    this._renderer.setStyle(this.window.nativeElement, 'height', '100vh');
    this._renderer.setStyle(this.window.nativeElement, 'top', '0');
    this._renderer.setStyle(this.window.nativeElement, 'left', '0');
  }

  resetMaximizedWindowStyles() {
    this._renderer.removeClass(this.window.nativeElement, 'app-window-container--maximixed');
    this._renderer.removeStyle(this.window.nativeElement, 'width');
    this._renderer.removeStyle(this.window.nativeElement, 'height');
    this._renderer.removeStyle(this.window.nativeElement, 'top');
    this._renderer.removeStyle(this.window.nativeElement, 'left');
  }
}