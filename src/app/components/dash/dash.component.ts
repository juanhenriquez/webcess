import { AppWindowComponent } from './../app-window/app-window.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { App } from './../../models/app';

@Component({
  selector: 'ws-dash',
  styleUrls: ['./dash.scss'],
  template: `
    <div class="dash-zone"></div>
    <div class="dash-container">
      <ul class="dash__list">
        <li class="dash__item" *ngFor="let app of apps" (click)="openApp(app.id)">
          <img class="dash__item__icon" [src]="'/assets/img/' + app.icon" alt="">
          <p class="dash__item_title">{{ app.name }}</p>
        </li>
      </ul>
    </div>
  `
})
export class DashComponent {
  @Input() apps: App[];
  @Output() open: EventEmitter<number> = new EventEmitter<number>();

  openApp(id: number) {
    this.open.emit(id);
  }
}