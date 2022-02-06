import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';
import { ApiService } from 'src/app/services/imdb/api.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  IMG_URL = "https://image.tmdb.org/t/p/w500";
  movies =  [];
  pageNum = 1;
  maxPages: any;

  fave = this.dbService.items_Firebase_Data.valueChanges();

  constructor(private router: Router, private apiService: ApiService, private dbService: FirebaseService) { }

  ngOnInit() {
    this.loadMovies();
  }

 
  loadMovies(event?){
    this.apiService.getItemPages("movie", this.pageNum).subscribe(data => {
      this.movies = this.movies.concat(data['results']);
      this.maxPages = data['total_pages'];

      console.log(data);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadMore(event) {
    console.log("Pages: ", this.maxPages);
    this.pageNum++;
    this.loadMovies(event);
    if (this.pageNum === this.maxPages) {
      event.target.disabled = true;
    }
  }

}


//https://www.youtube.com/watch?v=yPBBWaQamWs