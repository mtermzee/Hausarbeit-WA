import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesPage } from './series.page';

const routes: Routes = [
  {
    path: '',
    component: SeriesPage
  },
  {
    path: 'tv/:id',
    loadChildren: () => import('./serie-detail/serie-detail.module').then( m => m.SerieDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesPageRoutingModule {}
