import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';

import { AppWindowComponent } from './components/app-window/app-window.component';

import { App } from './models/app';

@Component({
  selector: 'app-root',
  template: `
    <div id="app-container">
      <div class="desktop-container" #entry></div>  
      <ws-app-window></ws-app-window>
      <ws-dash 
        [apps]="apps"
        (open)="onOpenApp($event)">
      </ws-dash>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  apps: App[] = [
    {
      id: 0,
      name: 'Visual Studio Code',
      img: 'vscode-bg.png',
      icon: 'vscode.png'
    },
    {
      id: 1,
      name: 'Spotify',
      img: 'spotify-bg.png',
      icon: 'spotify.png'
    }
  ];

  constructor(
    private _resolver: ComponentFactoryResolver
  ) { }

  onOpenApp(id: number){
    const appWindowFactory = this._resolver.resolveComponentFactory(AppWindowComponent);
    const component = this.entry.createComponent(appWindowFactory);
  }
}
