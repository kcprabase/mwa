import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JobDataService {
  private _baseUrl: string;
  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:3000/api";
  }

  public getJobs(offset: number, count: number): Observable<any> {
    return this._http.get(`${this._baseUrl}/jobs?offset=${offset}&count=${count}`);
  }


}
