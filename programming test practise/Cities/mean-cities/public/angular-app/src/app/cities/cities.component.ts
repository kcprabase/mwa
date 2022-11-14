import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';

export class City {
  #_id!: String;
  #city!: String;
  #zip!: String;
  #loc!: {
    x: Number,
    y: Number
  };
  #pop!: Number;
  #state!: String;

  get _id() { return this.#_id };
  get city() { return this.#city; }
  get zip() { return this.#zip; }
  get x() { return this.#loc.x; }
  get y() { return this.#loc.y; }
  get pop() { return this.#pop; }
  get state() { return this.#state; }

  set _id(_id) { this.#_id = _id; }
  set city(city) { this.#city = city; }
  set zip(zip) { this.#zip = zip; }
  set x(x) { this.#loc.x = x; }
  set y(y) { this.#loc.y = y; }
  set loc(loc: { x: Number, y: Number }) { this.#loc = loc; }
  set pop(pop) { this.#pop = pop; }
  set state(state) { this.#state = state; }

  constructor() {
    this.loc = { x: 0, y: 0 };
  }
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  count: number = 5;
  offset: number = 0;
  busy: boolean =true;
  cities!: City[];

  constructor(private cityService: CitiesDataService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.busy = true;
    this.cityService.getCities(this.offset, this.count).subscribe({
      next: (cities) => this.fillCities(cities),
      error: (error) => {
        this.cities = []; console.log(error);
        this.busy = false;
      },
    });
  }

  private fillCities(cities: City[]) {
    this.cities = cities;
    this.busy = false;
  }

  next(): void {
    this.offset = this.offset + this.count;
    this.getCities();
  }

  prev(): void {
    this.offset = Math.max(0, this.offset - this.count);
    this.getCities();
  }

}
