import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, Renderer2, ViewChildren, QueryList } from '@angular/core';

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
export class AppComponent implements OnInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChildren(AppWindowComponent) appWindows: QueryList<AppWindowComponent>
  
  appsMap: Map<number, App>;
  activeApp: number;

  apps: App[] = [
    {
      id: 0,
      name: 'Visual Studio Code',
      img: 'vscode-bg.png',
      icon: 'vscode.png',
      open: false
    },
    {
      id: 1,
      name: 'Spotify',
      img: 'spotify-bg.png',
      icon: 'spotify.png', 
      open: false
    }
  ];

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _render: Renderer2
  ) { }

  ngOnInit() {
    const map = this.apps.map<[number, App]>(app => [app.id, app]); 
    this.appsMap = new Map<number, App>(map);
  }

  onOpenApp(id: number){
    let app = this.appsMap.get(id);
    this.activeApp = id;
    
    if (!app.open) {
      const appWindowFactory = this._resolver.resolveComponentFactory(AppWindowComponent);
      const component = this.entry.createComponent(appWindowFactory).instance;
      this.appsMap.set(id, Object.assign({}, app, { open: true }))
      
      component.title = app.name;
      component.img = app.img;
    }
    console.log(this.appWindows);
  }

}
