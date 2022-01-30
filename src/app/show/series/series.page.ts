import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/imdb/api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  IMG_URL = "https://image.tmdb.org/t/p/w500";
  series =  [];
  pageNum = 1;
  maxPages: any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     this.loadSeries();
  }

    loadSeries(event?){
    this.apiService.getTvPages(this.pageNum).subscribe(data => {
      this.series = this.series.concat(data['results']);
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
    this.loadSeries(event);
    if (this.pageNum === this.maxPages) {
      event.target.disabled = true;
    }
  }

}
