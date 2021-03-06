import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { DashComponent } from './components/dash/dash.component';
import { AppWindowComponent } from './components/app-window/app-window.component';

import { WindowBarDirective } from './components/app-window/window-bar.directive';

import { ProcessPlanificationService } from './services/process-planification.service';
import { MemoryManagmentService } from './services/memory-managment.service';
import { SystemManagmentService } from './services/system-managment.service';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    AppWindowComponent,
    WindowBarDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AppService,
    SystemManagmentService,
    MemoryManagmentService,
    ProcessPlanificationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ AppWindowComponent ]
})
export class AppModule { }
