import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';
import firebase from "firebase/compat/app";
import { Observable } from 'rxjs';

const dbRef = firebase.database().ref();
const db = firebase.database();

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  items_Firebase_Data :AngularFireList<any>;
  items_angular: Observable<any[]>;
  
  userId: string;

  constructor(private afDb: AngularFireDatabase) { 
    this.userId = firebase.auth().currentUser.uid;

    //----< ngOnInit() >----
    //* get table in firebase for create read update delete
    this.items_Firebase_Data = this.afDb.list('favorites/' + this.userId);
    //* get android observable ngfor
    this.items_angular = this.items_Firebase_Data.valueChanges();
    //----</ ngOnInit() >----
    //this.items = this.database.list('favorites/' + this.userId).snapshotChanges();
  }

  // return an observable list with optional query
  getItemsList() { 
    console.log(this.userId);
    return dbRef.child("favorites").child(this.userId).get();
  }

  // Create a brand new item
  createItem(items, id) {
    //items.userId = this.userId;
    db.ref('favorites/' + this.userId + '/' + id).set(items);
  }

  // delete item
  deleteItem(id) {
      this.items_Firebase_Data.remove(id)
      .then(x=>console.log("Success removed"))
      .catch(error =>console.log("Error",error));
    
   /* db.ref('favorites/' + this.userId + '/' + id).remove()
      .then(x => {
        console.log("Success removed")
      })
      .catch(error =>console.log("Error",error));*/
  }
}
