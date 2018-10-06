import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailablePlaycardsService } from './services/available-playcards.service';
import { HierarchyService } from './services/hierarchy.service';
import { HoverAnimationDelayService } from './services/hover-animation-delay.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HoverAnimationDelayService,
    AvailablePlaycardsService,
    HierarchyService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
