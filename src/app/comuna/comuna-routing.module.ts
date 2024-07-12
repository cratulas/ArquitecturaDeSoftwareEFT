import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunaPage } from './comuna.page';

const routes: Routes = [
  {
    path: '',
    component: ComunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunaPageRoutingModule {}
