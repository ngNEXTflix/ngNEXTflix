import { Injectable } from '@angular/core';
import { AnimationDelay } from './abstract-animation-delay';

@Injectable()
export class HoverAnimationDelayService extends AnimationDelay {
  private static HOVER_ANIMATION_COOLDOWN = 400;

  private pendingHoverLeave:boolean;
  private shouldIgnoreHover:boolean;
  private pendingHoverAnimationId:number;

  // #CTOR#
  constructor() {
    super(HoverAnimationDelayService.HOVER_ANIMATION_COOLDOWN);
    this.pendingHoverLeave = false;
    this.shouldIgnoreHover = false;
    this.pendingHoverAnimationId = null;
  }

  // #Public Methods#
  public setAnimation(animationId:number) {
    if (this.shouldIgnoreHover) {
      return;
    }

    if (this.pendingHoverLeave) {
      this.pendingHoverAnimationId = animationId;
      return;
    }
    
    super.setAnimation(animationId);
  }

  public removedCurrentAnimation(animationId:number) {
    if (this.pendingHoverLeave) {
      return true;
    }

    return super.removedCurrentAnimation(animationId);
  }

  public triggerHoverLeave(animationId:number) {
    this.pendingHoverLeave = true;
    setTimeout(() => {
      this.updateCurrentAnimation(animationId);
      this.pendingHoverLeave = false;
      this.checkForPendingAnimation();
    }, HoverAnimationDelayService.HOVER_ANIMATION_COOLDOWN);
  }

  public setIgnoreHover(ignoreHover:boolean) {
    this.shouldIgnoreHover = ignoreHover;
  }

  // #Private Methods#
  private checkForPendingAnimation() : void {
    if (this.pendingHoverAnimationId) {
      super.setAnimation(this.pendingHoverAnimationId);
      this.pendingHoverAnimationId = null;
    }
  }
}