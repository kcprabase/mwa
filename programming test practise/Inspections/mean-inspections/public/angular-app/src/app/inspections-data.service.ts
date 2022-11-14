import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InspectionsDataService {

  private baseUrl: string = "http://localhost:3000/api"
  constructor(private http: HttpClient) { }

  getInspections(offset: number, count: number): Observable<any> {
    const url = `${this.baseUrl}/inspections?offset=${offset}&count=${count}`
    return this.http.get(url);
  }

  getInspection(inspectionId: string): Observable<any> {
    const url = `${this.baseUrl}/inspections/${inspectionId}`
    return this.http.get(url);
  }

  deleteInspection(inspectionId: string): Observable<any> {
    const url = `${this.baseUrl}/inspections/${inspectionId}`
    return this.http.delete(url);
  }
}
