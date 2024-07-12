import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegionPageRoutingModule } from './region-routing.module';

import { RegionPage } from './region.page';
import { SharedModule } from '../components/shared/shared.module'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegionPageRoutingModule,
    SharedModule 
  ],
  declarations: [RegionPage]
})
export class RegionPageModule {}
