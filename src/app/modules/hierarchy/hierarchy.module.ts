import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HierarchyRoutingModule } from './hierarchy-routing.module';
import { LayerModule } from '../../widget/layer/layer.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HierarchyRoutingModule,
    SharedModule,
    LayerModule
  ],
  declarations: []
})
export class HierarchyModule { }
