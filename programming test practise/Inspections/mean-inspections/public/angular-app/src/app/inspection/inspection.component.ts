import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionsDataService } from '../inspections-data.service';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  inspectionId!: string;
  inspection!: any;
  constructor(private route: ActivatedRoute, private inspectionService: InspectionsDataService, private router: Router) {
    this.inspectionId = route.snapshot.params["inspectionId"];
  }

  ngOnInit(): void {
    this.inspectionService.getInspection(this.inspectionId).subscribe(ins => {
      this.inspection = ins;
    });
  }

  delete(): void {
    this.inspectionService.deleteInspection(this.inspectionId).subscribe(res => {
      this.router.navigate(["inspections"]);
    });
  }

}
