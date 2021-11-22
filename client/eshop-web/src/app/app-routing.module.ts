import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([{
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
  }]),
  Shell.childRoutes([{
    path: 'product',
    loadChildren: () =>
    import('./modules/product/product.module').then(
      (m) => m.ProductModule
    )
  }]),
  Shell.childRoutes([{
    path: 'order',
    loadChildren: () =>
    import('./modules/orders/orders.module').then(
      (m) => m.OrdersModule
    )
  }]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules })
    ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
