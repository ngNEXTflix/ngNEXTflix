import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericNodeComponent } from './generic-node/generic-node.component';
import { PlaycardNodeComponent } from './playcard-node/playcard-node.component';
import { HoveredNodeComponent } from './hovered-node/hovered-node.component';
import { PlaycardDetailsComponent } from './playcard-details/playcard-details.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ComingSoonPicRetrieverService } from './playcard-node/coming-soon-pic-retriever/coming-soon-pic-retriever.service';
import { AnimationDistanceService } from './playcard-node/animation-distance/animation-distance.service';
import { PlaycardSideComponent } from './playcard-side/playcard-side.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ColorPickerModule,
    MatSliderModule
  ],
  declarations: [
    GenericNodeComponent,
    PlaycardNodeComponent,
    HoveredNodeComponent,
    PlaycardDetailsComponent,
    PlaycardSideComponent],
  exports: [GenericNodeComponent, PlaycardDetailsComponent],
  providers:[
    ComingSoonPicRetrieverService,
    AnimationDistanceService
  ]
})
export class NodeModule { }
