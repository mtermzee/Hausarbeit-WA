import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  createUser(user){
    this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential =>{
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.fullname
        });

        // if ok, navigate to home
        this.insertUserData(userCredential)
          .then(() => {
            console.log("OK");
            this.router.navigate(['/login']);
          });
      })
      // if not, do something
      .catch(error => {
         console.log("NOT OK");
        this.eventAuthError.next(error);
      })
  }

  // get user session
  getUserState(){
    return this.firebaseAuth.authState;
  }

  // send user Info into datebase
  insertUserData(userCredential: firebase.auth.UserCredential){
    console.log("Send data to db");
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      uid: userCredential.user.uid,
      fullname: this.newUser.fullname,
      email: this.newUser.email,
      role: 'network user'
    })
  }

  // log in into session
  login(email: string, password: string){
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential){
          this.router.navigate(['/home']);
        }
      })
  }

  // log out of session
  logout(){
    return this.firebaseAuth.signOut();
  }
}
