import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage:Storage, private alertCtrl: AlertController) { }

  setIntialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

      this.storage.get(LNG_KEY).then(val => {
      if (val){
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages(){
    return [
      { text: 'English', value: 'en', img: 'assets/icon/en.png'},
      { text: 'German', value: 'de', img: 'assets/icon/de.png'},
    ];
  }

  setLanguage(lng){
    // Swich bet. Lang
    this.translate.use(lng);
    // for our App storage
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);

    /*.then(
      
      async () => {
        // success, show some message
        const alert = await this.alertCtrl.create({
          message: 'If you change the language, you might restart the application.',
          buttons: [{
            text: 'ok', role: 'cancel', handler: () => {
              // this.router.navigate(['/login']);
            },
          },],
        });
        await alert.present();
      }
    );*/
    
    console.log("Deafult Language: " + lng);
  }
}
