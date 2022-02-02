import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SerieDetailPageRoutingModule } from './serie-detail-routing.module';
import { SerieDetailPage } from './serie-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SerieDetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [SerieDetailPage]
})
export class SerieDetailPageModule {}
