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

  // get Items(Movie, Tv) by url
  getItems(typ, url){
    return this.http.get(`${BASE_URL}/discover/${typ}?${url}&api_key=${API_KEY}&language=${this.lang}`);
  }

  // get internal(Movie, Tv) by ID
  getItemId(typ, id){
     return this.http.get(`${BASE_URL}/${typ}/${id}?api_key=${API_KEY}&language=${this.lang}`);
  }

  // get Items(Movie, Tv) by Page
  getItemPages(typ, pNumber){
    return this.http.get(`${BASE_URL}/${typ}/popular?&api_key=${API_KEY}&language=${this.lang}&page=${pNumber}`);
  }

  // get Items(Movie, Tv) Videos
  getItemVideos(typ, id){
    return this.http.get(`${BASE_URL}/${typ}/${id}/videos?api_key=${API_KEY}&language=${this.lang}`);
  }

  // get Items(Movie, Tv) Similars
  getItemSimilars(typ, id) {
    return this.http.get(`${BASE_URL}/${typ}/${id}/similar?api_key=${API_KEY}&language=${this.lang}`);
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
