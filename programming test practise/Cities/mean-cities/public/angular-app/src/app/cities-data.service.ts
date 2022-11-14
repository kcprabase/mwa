import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from './cities/cities.component';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {
  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getCities(offset: number, count: number, cityName?: string, lat?: number, lng?: number, distance?: number): Observable<City[]> {
    let url: string = `${this.apiBaseUrl}/cities?offset=${offset}&count=${count}`;
    if (cityName) {
      url += `&cityName=${cityName}`;
    }
    if (lat && lng && distance) {
      url += `&lat=${lat}&lng=${lng}&distance=${distance}`;
    }
    return this.http.get<City[]>(url);
  }

  public getCity(cityId: string): Observable<City> {
    const url: string = this.apiBaseUrl + "/cities/" + cityId;

    return this.http.get<City>(url);
  }

}
