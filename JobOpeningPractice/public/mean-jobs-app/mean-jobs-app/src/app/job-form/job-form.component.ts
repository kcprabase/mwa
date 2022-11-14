import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  @ViewChild(NgForm) jobForm!: NgForm;
  job: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  saveJob(): void {
    console.log(this.jobForm.value);
  }

}
