import { Component } from '@angular/core';
import { ShipsDataService } from '../ships-data.service';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  title = 'mean-ships';
  model: any = {};
  ships!: Ship[];

  constructor(private shipService: ShipsDataService) { }

  search(): void {
    this.shipService.getShips(0, 0, this.model.lat, this.model.lng, this.model.distance).then((response: Ship[]) => {
      console.log(response);
      this.ships = response;
    })
  }
}
