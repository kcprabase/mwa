import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  distance!: number;
  // city:City= new City({_id: "123", cityId: "123", location: {address: {street1: "", city: "", state: "", zip: ""}, geo: {}}});
  city: City = new City();
  cities!: City[];
  constructor(private cityService: CitiesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cityId: string = this.route.snapshot.params["cityId"];

    this.cityService.getCity(cityId).subscribe({
      next: (city) => this.fillCity(city),
      error: (error) => {
        this.city = new City(); console.log(error);
      },
    });
  }

  private fillCity(city: City): void {
    this.city = city;
    console.log("this.city", this.city);

  }

  search() {
    console.log("heresf");

    this.cityService.getCities(0, 10, "", <number>this.city.loc.y, <number>this.city.loc.x, <number>this.distance * 1609.344).subscribe(
      {
        next: (cities) => { this.cities = cities; },
        error: (err) => {
          this.cities = []; console.log(err);
        }
      }
    );
  }

}
