import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    CitiesComponent,
    CityComponent,
    HomeComponent,
    SearchComponent,
    ErrorPageComponent
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
        path: "cities",
        component: CitiesComponent
      },
      {
        path: "cities/:cityId",
        component: CityComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "search/:cityId",
        component: CityComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
