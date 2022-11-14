import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any = []
  constructor(private _moviesService: MovieDataService) { }

  ngOnInit(): void {
    this._moviesService.getMovies(0, 50).subscribe(value => {
      this.movies = value;
    });
  }

}
