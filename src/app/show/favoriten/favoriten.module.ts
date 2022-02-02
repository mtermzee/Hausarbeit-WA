import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoritenPageRoutingModule } from './favoriten-routing.module';
import { FavoritenPage } from './favoriten.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritenPageRoutingModule,
    TranslateModule
  ],
  declarations: [FavoritenPage]
})
export class FavoritenPageModule {}
