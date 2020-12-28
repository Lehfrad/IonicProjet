import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsContactPage } from './details-contact.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsContactPageRoutingModule {}
