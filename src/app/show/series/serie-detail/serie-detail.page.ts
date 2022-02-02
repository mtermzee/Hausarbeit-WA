import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';
import { ApiService } from 'src/app/services/imdb/api.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.page.html',
  styleUrls: ['./serie-detail.page.scss'],
})
export class SerieDetailPage implements OnInit {
  information: any;
  isSeeMore: boolean = false;
  favorites: any;
  today: number = Date.now();
  
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private dbService: FirebaseService) { }

  ngOnInit() {
     let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getTvshow(id).subscribe(result => {
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
      name: this.information.name,
      date: this.information.first_air_date,
      vote: this.information.vote_average,
      pic: this.information.poster_path,
      homepage: this.information.homepage,
      timeAdded: this.today,
      type: "serie"
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
