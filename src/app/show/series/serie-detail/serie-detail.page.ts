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

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
     let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getTvshow(id).subscribe(result => {
      this.information = result;
      console.log('details: ',this.information);
    });
  }

  openWebsite(){
    window.open(this.information.Website, '_blank');
  }
}
