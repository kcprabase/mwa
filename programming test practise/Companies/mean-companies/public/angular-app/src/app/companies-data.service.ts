import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company, Employee } from './companies/companies.component';

@Injectable({
  providedIn: 'root'
})
export class CompaniesDataService {
  private apiBaseUrl: string = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getCompanies(offset: number, count: number, employeeName?: string, sort?: boolean): Promise<Company[]> {
    let url: string = `${this.apiBaseUrl}/companies?offset=${offset}&count=${count}`;
    if (employeeName) {
      url += `&employeeName=${employeeName}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Company[]})
      .catch(this.handleError);
  }

  public getCompany(companyId: string): Promise<Company> {
    const url: string = this.apiBaseUrl + "/companies/" + companyId;

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Company})
      .catch(this.handleError);
  }

  public getEmployees(companyId: string): Promise<Employee[]> {
    const url: string = this.apiBaseUrl + "/companies/" + companyId + "/relationships";

    return this.http.get(url).toPromise()
      // .then(response => {console.log(response); response as Company[]})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
