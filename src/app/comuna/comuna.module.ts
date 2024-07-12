import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComunaPageRoutingModule } from './comuna-routing.module';

import { ComunaPage } from './comuna.page';
import { SharedModule } from '../components/shared/shared.module'; // Importa el módulo compartido

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunaPageRoutingModule,
    SharedModule
  ],
  declarations: [ComunaPage]
})
export class ComunaPageModule {}
