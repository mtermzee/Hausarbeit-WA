import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import firebase from "firebase/compat/app";
import { PopoverController } from '@ionic/angular';
import { LanguagePopoverPage } from '../popovers/language-popover/language-popover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: firebase.User;

  constructor(private router:Router, private authService: AuthService, private popoverCtrl: PopoverController) {}

  ngOnInit() {
    return this.authService.getUserState()
      .subscribe(user => {
        this.user =  user;
      })
  }

  async openLanguagePopover(ev){
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverPage,
      event: ev
    });
    await popover.present();
  }
}
