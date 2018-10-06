import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HierarchyLayerComponent } from '../../widget/layer/hierarchy-layer/hierarchy-layer.component';

const routes: Routes = [
  { 
    path: '',
    component: HierarchyLayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HierarchyRoutingModule { }
