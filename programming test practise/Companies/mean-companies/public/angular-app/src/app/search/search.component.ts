import { Component, OnInit } from '@angular/core';
import { CompaniesDataService } from '../companies-data.service';
import { Company } from '../companies/companies.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  employeeName!: string;
  offset: number = 0;
  count: number = 5;
  companies!: Company[];
  constructor(private _companyService: CompaniesDataService) { }

  ngOnInit(): void {
  }

  setEmpName(event: any) {
    console.log(event.target.value);
    this.employeeName = event.target.value;
  }

  find(): void {
    this.offset = 0;
    console.log("name", this.employeeName);
    this.getComs();
  }

  next() {
    this.offset = this.offset + this.count;
    this.getComs();
  }
  prev() {
    this.offset = Math.max(this.offset - this.count, 0);
    this.getComs();
  }

  getComs(): void {
    this._companyService.getCompanies(this.offset, this.count, this.employeeName).then(value => {
      this.companies = value;
    });
  }

}
