import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { App } from './../models/app';

@Injectable()
export class SystemManagmentService {

  private API_URI = 'http://localhost:3000';

  constructor(
    private _http: Http
  ) { }

  getSystemInfo(): Observable<any> {
    return this._http
      .get(`${this.API_URI}/system`)
      .map((response: Response) => response.json());
  }

  calculateDiskSpace(diskSpace, apps: App[]) {
    let memoryUsed = apps.reduce<number>((prev, current) => {
      return current.size + prev;
    }, 0);

    let freeSpace = diskSpace - memoryUsed;
    let freeSpacePercent = Math.floor((memoryUsed * 100) / diskSpace);

    return {
      freeSpace,
      freeSpacePercent: `${freeSpacePercent}%`
    }
  }

}
