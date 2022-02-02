import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';
import { ApiService } from 'src/app/services/imdb/api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  information: any;
  isSeeMore: boolean = false;
  favorites: any;
  today: number = Date.now();

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private dbService: FirebaseService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getMovie(id).subscribe(result => {
      this.information = result;
      console.log('details: ',this.information);
    });
  }

  openWebsite(){
    window.open(this.information.homepage, '_blank');
  }

  getColor(i) {
    let colors = ["#8C1B2F", "#283040", "#95D904", "#045E74", "#01A794"]
    return colors[i];
  }

  setFav() {
    this.favorites = {
      uid: this.information.id,
      name: this.information.title,
      date: this.information.release_date,
      vote: this.information.vote_average,
      pic: this.information.poster_path,
      homepage: this.information.homepage,
      timeAdded: this.today,
      type: "movie"
  }; 
    this.dbService.createItem(this.favorites, this.information.id);
  }
}
