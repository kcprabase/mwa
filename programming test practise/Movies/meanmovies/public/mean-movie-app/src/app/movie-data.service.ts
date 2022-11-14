import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private _baseUrl: string;
  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:3000/api"
  }

  public getMovies(offset: number, count: number): Observable<any> {
    return this._http.get(`${this._baseUrl}/movies?offset=${offset}&count=${count}`);
  }

  public getMovie(movieId: string): Observable<any> {
    return this._http.get(`${this._baseUrl}/movies/${movieId}`);
  }

  public deleteMovie(movieId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/movies/${movieId}`);
  }
}
