import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconComponent } from './components/icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    IconComponent
  ],
  exports:[ 
    CommonModule, 
    FormsModule,
    RouterModule,
    IconComponent
 ]
})
export class SharedModule { }
