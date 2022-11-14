import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from '../movie-data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any = {}
  movieId!: string;
  constructor(private _moviesService: MovieDataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.movieId = this._route.snapshot.params['movieId'];
    console.log(this.movieId)
    this._moviesService.getMovie(this.movieId).subscribe(value => {
      this.movie = value;
    });
  }

  deleteMovie() {
    this._moviesService.deleteMovie(this.movieId).subscribe(() => {
      this._router.navigate(["/movies"]);
    });
  }
}
