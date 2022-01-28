import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }
}
