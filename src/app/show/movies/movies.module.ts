import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoviesPageRoutingModule } from './movies-routing.module';
import { MoviesPage } from './movies.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule,
    TranslateModule,
    NgxPaginationModule
  ],
  declarations: [MoviesPage]
})
export class MoviesPageModule {}
