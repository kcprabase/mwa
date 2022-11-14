import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { JobFormComponent } from './job-form/job-form.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    JobsComponent,
    JobFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "jobs",
        component: JobsComponent
      },
      {
        path: "addjob",
        component: JobFormComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
