import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';
import { ApiService } from 'src/app/services/imdb/api.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
  id: any;

  // Videos 
  videos: any;
  key: string;
  ytUrl: string;
  videoUrl: any;
  done: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private dbService: FirebaseService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getMovie(this.id).subscribe(result => {
      this.information = result;
      console.log('details: ',this.information);
    });

    this.getVideos();
  }

  getVideos() {
     this.apiService.getMovieVideos(this.id).subscribe(result => {
      this.videos = result;
       console.log('videos: ', this.videos);
       // https://angular.io/guide/security#xss
       // https://stackoverflow.com/questions/39438039/correct-way-provide-domsanitizer-to-component-with-angular-2-rc6
       this.key = this.videos.results[0].key;
       if (this.key) {
         this.done = true;
         this.ytUrl = 'https://www.youtube.com/embed/' + this.key;
         this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ytUrl);}
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

  share(name, homepage) {
      navigator.share({
      'title': name,
      'text': 'Check out this one!',
      'url': homepage
    }).then(function() {
      console.log('Successful share');
    }).catch(function(error) {
      console.log('Error sharing:', error)
    });
  }
}
