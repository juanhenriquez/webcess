import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { App } from './models/app';

@Injectable()
export class AppService {

  private API_URI = 'http://localhost:3000';

  constructor(
    private _http: Http
  ) { }

  getApps(): Observable<App[]> {
    return this._http
      .get(`${this.API_URI}/apps`)
      .map((response: Response) => response.json());
  }

}
