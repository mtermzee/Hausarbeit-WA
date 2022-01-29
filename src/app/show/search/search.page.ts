import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, SearchType } from 'src/app/services/imdb/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  IMG_URL = "https://image.tmdb.org/t/p/w500";
  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  //Search 
  searchChanged(e){
    this.results = this.apiService.searchData(this.searchTerm, this.type);
  }

}
