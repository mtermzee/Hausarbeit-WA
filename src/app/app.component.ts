import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { LanguageService } from './services/language/language.service';
import { Storage } from '@ionic/storage-angular'
import { AuthService } from './services/authentication/auth.service';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: firebase.User;

  constructor(
    private platform: Platform,
    public router: Router,
    private languageService: LanguageService,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

   ngOnInit() {
    return this.authService.getUserState()
      .subscribe(user => {
        this.user = user;
      });
  }

  initializeApp(){
    this.platform.ready().then(() => {
      console.log('load splash screen');
      this.router.navigateByUrl('splash-screen');

      this.storage.create();
      this.languageService.setIntialAppLanguage();
    });
  }
}
