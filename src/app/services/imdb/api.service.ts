import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../language/language.service';

export enum SearchType{
  all = 'multi',
  movie = 'movie',
  series = 'tv',
}

const API_KEY = environment.API_KEY;
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private storage:Storage, private languageService : LanguageService) { }

  // get Lang
  lang = this.languageService.selected;

   // get Movies by url
  getMovies(url){
    return this.http.get(`${BASE_URL}/discover/movie?${url}&api_key=${API_KEY}&language=${this.lang}`);
  }

  // get movies by url
  getTvshows(url){
    return this.http.get(`${BASE_URL}/discover/tv?${url}&api_key=${API_KEY}&language=${this.lang}`);
  }

  // by internal ID
  getMovie(id){
     return this.http.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${this.lang}`);
  }

  // by internal ID
  getTv(id){
     return this.http.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${this.lang}`);
  }

  // Search by name
  searchData(title: string, type: SearchType): Observable<any>{
    return this.http.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURI(title)}&language=${this.lang}`).
      pipe(
        map(results => {
          console.log('RAW: ', results['results']);
          return results['results'];
        })
        ,catchError((error: HttpErrorResponse )=> throwError(console.log("404: ", error)))
      );
  }
}
