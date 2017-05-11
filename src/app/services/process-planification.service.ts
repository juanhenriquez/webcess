import { Injectable } from '@angular/core';

import { MemoryManagmentService } from './memory-managment.service';

import { App } from './../models/app';

@Injectable()
export class ProcessPlanificationService {

  deadlockList: Map<number, App> = new Map();
  readyList: Map<number, App> = new Map();
  newList: Map<number, App>;
  executedApp: App;
  usedResourcesList: { sound?: number, camera?: number } = { sound: null, camera: null};

  events = {};

  constructor(
    private _memory: MemoryManagmentService
  ) {}

  initProcessPlanification(apps: App[]): void {
    const map = apps.map<[number, App]>(app => [app.id, app]); 
    this.newList = new Map(map);

    // setInterval(() => {
      
    //   this.roundRobin();

    // }, 1000);
  }

  moveFromNewToReady(id) {
    const process = this.newList.get(id);
    this._memory.allocateMemory(this._memory.mainMemoryPages, process.id, process.ramReq);

    

  }

  moveFromReadyToExecuting() {

  }

  moveFromDeadlockToReady() {

  }

  moveFromExecutingToDeadlock() {

  }

  
  /**
   * Verify if a process can have the ready state.
   * 
   * @param {App} process 
   * @returns boolean
   * 
   * @memberof ProcessPlanificationService
   */
  canReady(process: App): boolean {
    const { id, resources } = process;
    let can = true;
    
    if (resources) {
      if (this.usedResourcesList) {

        // iterate through the process resources
        Object.keys(resources)
          .forEach(resource => {
            // if the list of system's resources don't have
            // the resource that we are verifying, then allocate
            // automatically the resource that we are requesting for.
            if (this.usedResourcesList[resource]) {
              if (this.usedResourcesList[resource] !== id) {
                can = false;
              }
            } else {
              this.usedResourcesList[resource] = id;
            }
          });
  
      } else {
        Object.keys(resources).forEach(resource => this.usedResourcesList[resource] = id);
      }
    }
    return can;
  }

  canExecute() {
    
  }

  canDeadlock() {

  }

  canUseResource(id: number, resource: string): boolean {
    if (this.usedResourcesList[resource]) {
      return (this.usedResourcesList[resource] === id) ? true : false; 
    } else {
      return true;
    }
  }

  allocateResource(id: number, resource: string) {
    if (this.canUseResource(id, resource)) {
      this.usedResourcesList[resource] = id;
    }
  }

  roundRobin() {

  }

  on(type: string, listener: Function) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type: string) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => {
        listener();
      });
    }
  }

}