import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'comuna',
    loadChildren: () => import('./comuna/comuna.module').then(m => m.ComunaPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'region',
    loadChildren: () => import('./region/region.module').then(m => m.RegionPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'modify',
    loadChildren: () => import('./modify/modify.module').then(m => m.ModifyPageModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierPageModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),

  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'oferta',
    loadChildren: () => import('./oferta/oferta.module').then( m => m.OfertaPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
