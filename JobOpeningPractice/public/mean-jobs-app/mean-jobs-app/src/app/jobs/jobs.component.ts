import { Component, OnInit } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs!: any;
  constructor(private _jobService: JobDataService) { }

  ngOnInit(): void {
    this._jobService.getJobs(0, 10).subscribe(value => {
      console.log(value)
      this.jobs = value;
    })
  }

}
