import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, PopoverController } from '@ionic/angular';
import { LanguageService } from './services/language/language.service';
import { Storage } from '@ionic/storage-angular'
import { AuthService } from './services/authentication/auth.service';
import firebase from "firebase/compat/app";
import { LanguagePopoverPage } from './popovers/language-popover/language-popover.page';

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
    private authService: AuthService,
    private menu: MenuController,
    private popoverCtrl: PopoverController
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

  async openLanguagePopover(ev){
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }

  logOut() {
    this.authService.logout();
     this.menu.enable(false, 'main-menu');
    this.menu.close('main-menu');
  }
}
