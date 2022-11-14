import { Component, OnInit } from '@angular/core';
import { InspectionsDataService } from '../inspections-data.service';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {

  offset: number = 0;
  count: number = 5;
  inspections!: any[];
  busy: boolean = false;
  constructor(private inspectionService: InspectionsDataService) { }

  ngOnInit(): void {
    this.getInspections()
  }

  getInspections(): void {
    this.busy = true;
    try {
      this.inspectionService.getInspections(this.offset, this.count).subscribe(ins => {
        this.inspections = ins;
        this.busy = false;
      });
    } catch (ex) {
      console.log("error occured", ex);
      this.busy = false;
    }
  }
  next(): void {
    this.offset += this.count;
    this.getInspections();
  }

  prev(): void {
    this.offset = Math.max(0, this.offset - this.count);
    this.getInspections();
  }

}
