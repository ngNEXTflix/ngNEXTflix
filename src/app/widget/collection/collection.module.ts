import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchyCategoryComponent } from './hierarchy-category/hierarchy-category.component';
import { NodeModule } from '../node/node.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NodeModule
  ],
  declarations: [HierarchyCategoryComponent],
  exports: [HierarchyCategoryComponent]
})
export class CollectionModule { }
