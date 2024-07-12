import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfertaPage } from './oferta.page';

const routes: Routes = [
  {
    path: '',
    component: OfertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfertaPageRoutingModule {}
