import { Component, OnInit } from '@angular/core';
import { ShipsDataService } from '../ships-data.service';

export class Ship {
  #_id!: string;
  #vesslterms!: string;
  #feature_type!: string;
  #chart!: string;
  #latdec!: number;
  #londec!: number;
  #depth!: number;
  #sounding_type!: string;
  #history!: string;
  #quasou!: string;
  #watlev!: string;
  #coordinates!: number[];

  get _id() { return this.#_id; }
  get vesslterms() { return this.#vesslterms; }
  get feature_type() { return this.#feature_type; }
  get chart() { return this.#chart; }
  get latdec() { return this.#latdec; }
  get londec() { return this.#londec; }
  get depth() { return this.#depth; }
  get sounding_type() { return this.#sounding_type; }
  get history() { return this.#history; }
  get quasou() { return this.#quasou; }
  get watlev() { return this.#watlev; }
  get coordinates() { return this.#coordinates; }

  set _id(id) { this.#_id = id; }
  set vesslterms(vesslterms) { this.#vesslterms = vesslterms; }
  set feature_type(feature_type) { this.#feature_type = feature_type; }
  set chart(chart) { this.#chart = chart; }
  set latdec(latdec) { this.#latdec = latdec; }
  set londec(londec) { this.#londec = londec; }
  set depth(depth) { this.#depth = depth; }
  set sounding_type(sounding_type) { this.#sounding_type = sounding_type; }
  set history(history) { this.#history = history; }
  set quasou(quasou) { this.#quasou = quasou; }
  set watlev(watlev) { this.#watlev = watlev; }
  set coordinates(coordinates) { this.#coordinates = coordinates; }
}

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Ship[];
  pageSize: number = 5;
  offset: number = 0;

  constructor(private shipService: ShipsDataService) { }

  ngOnInit(): void {
    this.getShips();
  }

  private fillShipsFromService(ships: Ship[]) {
    this.ships = ships;
  }

  pageUpdate(): void {
    this.offset = 0;
    this.getShips();
  }

  prevClicked() {
    this.offset = Math.max(0, this.offset - this.pageSize);
    this.getShips();
  }
  nextClicked() {
    this.offset = this.offset + parseInt(this.pageSize.toString());
    this.getShips();
  }

  getShips(): void {
    this.shipService.getShips(this.pageSize, this.offset).then(response => this.fillShipsFromService(response));
  }



}
