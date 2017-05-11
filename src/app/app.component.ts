import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, Renderer2, ViewChildren, QueryList } from '@angular/core';

// components
import { AppWindowComponent } from './components/app-window/app-window.component';

// services
import { ProcessPlanificationService } from './services/process-planification.service';
import { SystemManagmentService } from './services/system-managment.service';
import { AppService } from './app.service';

// models
import { App } from './models/app';

@Component({
  selector: 'app-root',
  template: `
    <div id="app-container">
      <div class="desktop-container" #entry></div>  
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
  
  appsOpenedList: Map<number, AppWindowComponent> = new Map<number, AppWindowComponent>();
  appsMap: Map<number, App>;
  activeApp: number;

  apps: App[];

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _render: Renderer2,
    private _appService: AppService,
    private _system: SystemManagmentService,
    private _process: ProcessPlanificationService
  ) { }

  ngOnInit() {
    this._appService.getApps()
      .subscribe((apps: App[]) => {
        const map = apps.map<[number, App]>(app => [app.id, app]); 
        this.appsMap = new Map<number, App>(map);
        this.apps = apps;
        this._process.initProcessPlanification(apps);
      });
  }

  onOpenApp(id: number){
    let app = this.appsMap.get(id);
    this.activeApp = id;
    
    if (!app.open) {
      const appWindowFactory = this._resolver.resolveComponentFactory(AppWindowComponent);
      const component = this.entry.createComponent(appWindowFactory);
      this.appsMap.set(id, Object.assign({}, app, { open: true }))
      
      component.instance.app = app;
      component.instance.title = app.name;
      component.instance.img = app.img;
      component.instance.close
        .subscribe((id: number) => {
          this.appsMap.delete(id);
          component.destroy();
        });
      
      this.appsOpenedList.set(id, component.instance);
    } else {
      this.appsOpenedList.get(id).focusWindow();
    }
  }
}
