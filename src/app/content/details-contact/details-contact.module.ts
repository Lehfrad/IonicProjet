import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsContactPageRoutingModule } from './details-contact-routing.module';

import { DetailsContactPage } from './details-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsContactPageRoutingModule
  ],
  declarations: [DetailsContactPage]
})
export class DetailsContactPageModule {}
