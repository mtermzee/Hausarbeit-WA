import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/imdb/api.service';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.page.html',
  styleUrls: ['./serie-detail.page.scss'],
})
export class SerieDetailPage implements OnInit {
  information: any;
  isSeeMore: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

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
}
