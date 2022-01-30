import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeriesPageRoutingModule } from './series-routing.module';
import { SeriesPage } from './series.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriesPageRoutingModule,
    TranslateModule,
    NgxPaginationModule
  ],
  declarations: [SeriesPage]
})
export class SeriesPageModule {}
