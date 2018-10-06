import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, RouterEvent, NavigationEnd } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './modules/hierarchy/hierarchy.module#HierarchyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
