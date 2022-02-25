import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';
import { ApiService } from 'src/app/services/tmdb/api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit, OnDestroy {
  IMG_URL = "https://image.tmdb.org/t/p/w500";
  series =  [];
  pageNum = 1;
  maxPages: any;

  fave = this.dbService.items_Firebase_Data.valueChanges();

  // fix MEMORY LEAKS
  private subscriptions = new Subscription();

  constructor(private router: Router, private apiService: ApiService, private dbService: FirebaseService) { 
    this.loadSeries();
  }

  ngOnInit() {
  }

  // fix MEMORY LEAKS
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSeries(event?) {
    // fix MEMORY LEAKS
    const sub = this.apiService.getItemPages("tv", this.pageNum).subscribe(data => {
      this.series = this.series.concat(data['results']);
      this.maxPages = data['total_pages'];

      console.log(data);

      if (event) {
        event.target.complete();
      }
    });
    // fix MEMORY LEAKS
    this.subscriptions.add(sub);
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
