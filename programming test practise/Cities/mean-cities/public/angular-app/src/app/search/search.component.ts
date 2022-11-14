import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText!: string;
  cities!: City[];
  constructor(private _cityService: CitiesDataService) { }

  ngOnInit(): void {
  }

  search(): void {
    this._cityService.getCities(0, 10, this.searchText).subscribe({
      next: (cities) => { this.cities = cities },
      error: (err) => { console.log(err); this.cities = []; }
    });
  }

}
