import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./content/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./content/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'details-contact/:myid',
    loadChildren: () => import('./content/details-contact/details-contact.module').then( m => m.DetailsContactPageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./content/message/message.module').then( m => m.MessagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
