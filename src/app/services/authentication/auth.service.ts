import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { async, BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private alertCtrl: AlertController) { }

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
      // handle errors
      .catch(error => {
        this.eventAuthError.next(error);
      })
      // success, show some message
      .then(userCredential => {
        if(userCredential){
          this.router.navigate(['/home']);
        }
      })
  }

  // log out of session
  logout() {
    // https://stackoverflow.com/questions/57003107/after-logout-with-one-user-then-loggin-with-another-user-old-user-information
    return this.firebaseAuth.signOut().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      //this.router.navigate(['/login']);
    });
  }

  // to reset Password by Email
  RestPassword(email: string){
    this.firebaseAuth.sendPasswordResetEmail(email)
      .then(
        async () => {
            // success, show some message
            const alert = await this.alertCtrl.create({
              message: 'Check your email to rest password',
              buttons:[{text: 'ok', role: 'cancel', handler: ()=>{
                this.router.navigate(['/login']);
              },},],
            });
            await alert.present();
          },
          err => {
            // handle errors
            this.eventAuthError.next(err);
          }
    );
  }
}
