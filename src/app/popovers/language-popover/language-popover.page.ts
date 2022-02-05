import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {
  languages = [];
  selected =  '';

  constructor(private popoverCtrl: PopoverController, private languageService: LanguageService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }

  select(lng){
    this.languageService.setLanguage(lng);
    this.popoverCtrl.dismiss();
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Restart App',
      message: 'The application must be restarted to function properly.',
      buttons: ['OK']
    });

    await alert.present();

    /*const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);*/
  }
}
