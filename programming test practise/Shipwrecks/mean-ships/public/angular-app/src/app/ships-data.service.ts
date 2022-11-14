import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ship } from './ships/ships.component';

@Injectable({
  providedIn: 'root'
})
export class ShipsDataService {
  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getShips(count: number, offset: number, lat?: number, lng?: number, distance?: number): Promise<Ship[]> {
    let url: string = `${this.apiBaseUrl}/ships`;
    if (lat && lng && distance) {
      url += `?lat=${lat}&lng=${lng}&distance=${distance}`
    } else {
      url += `?count=${count}&offset=${offset}`;
    }

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Ship[]})
      .catch(this.handleError);
  }

  public getShip(shipId: string): Promise<Ship> {
    const url: string = this.apiBaseUrl + "/ships/" + shipId;

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Ship})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
