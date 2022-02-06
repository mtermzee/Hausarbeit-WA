import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/datebase/firebase.service';

@Component({
  selector: 'app-favoriten',
  templateUrl: './favoriten.page.html',
  styleUrls: ['./favoriten.page.scss'],
})
export class FavoritenPage implements OnInit {
   // favorites: [];
  favorites = this.dbService.items_Firebase_Data.valueChanges();
  //today: number = Date.now();
  
  constructor(private dbService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.favorites;
  }

  get() {
    /*this.dbService.items_angular.subscribe(x => {
        this.favorites = this.favorites.concat(x);
        console.log(this.favorites);
    });
    return this.favorites;*/

  /*  return this.dbService.getItemsList().then((snapshot) => {
      if (snapshot.exists()) {
        this.favorites = this.favorites.concat(snapshot.val());
        console.log(this.favorites);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });*/

   

    /*.then((snapshot) => { 
      if (snapshot.exists()) {
        this.favorites.uid = snapshot.val().uid;
        this.favorites.name = snapshot.val().name;
        this.favorites.date = snapshot.val().date;
        this.favorites.pic = snapshot.val().pic;
        this.favorites.vote = snapshot.val().vote;
        this.favorites.homepage = snapshot.val().homepage;
      }else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });*/
  }

  delete(id) {
    console.log(id);
    return this.dbService.deleteItem(id.toString());
  }

   openWebsite(homepage){
    window.open(homepage, '_blank');
   }
  
}
