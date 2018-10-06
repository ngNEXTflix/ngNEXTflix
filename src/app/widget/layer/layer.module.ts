import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionModule } from '../collection/collection.module';
import { HierarchyLayerComponent } from './hierarchy-layer/hierarchy-layer.component';


@NgModule({
  imports: [
    CommonModule,
    CollectionModule
  ],
  declarations: [HierarchyLayerComponent],
  exports: [HierarchyLayerComponent]
})
export class LayerModule { }
