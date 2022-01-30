import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./account/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./account/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./popovers/language-popover/language-popover.module').then( m => m.LanguagePopoverPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./show/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'series',
    loadChildren: () => import('./show/series/series.module').then( m => m.SeriesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./show/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'movie/:id',
    loadChildren: () => import('./show/movies/movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },
  {
    path: 'tv/:id',
    loadChildren: () => import('./show/series/serie-detail/serie-detail.module').then( m => m.SerieDetailPageModule)
  },

  /*{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
