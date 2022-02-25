import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';

@Component({
  selector: 'app-favoriten',
  templateUrl: './favoriten.page.html',
  styleUrls: ['./favoriten.page.scss'],
})
export class FavoritenPage implements OnInit {
  favorites = this.dbService.items_Firebase_Data.valueChanges();
  
  constructor(private dbService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.favorites;
  }
  
  delete(id) {
    console.log(id);
    return this.dbService.deleteItem(id.toString());
  }

   openWebsite(homepage){
    window.open(homepage, '_blank');
   }
  
}
