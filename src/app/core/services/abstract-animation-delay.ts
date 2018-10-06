import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export abstract class AnimationDelay {
  // #Const Members#
  private COOL_DOWN:number;

  // #Private Members#
  private currentTimeout:any;
  private currentAnimation$:BehaviorSubject<number>;
  private pendingAnimationId:number;

  constructor(coolDown) {
    this.COOL_DOWN = coolDown;

    this.currentAnimation$ = new BehaviorSubject<number>(null);
    this.currentTimeout = null;
    this.pendingAnimationId = null;
  }

  public getAnimation() : Observable<number> {
    return this.currentAnimation$.asObservable();
  }

  public setAnimation(animationId:number) : void {
    this.pendingAnimationId = animationId;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }

    this.setCurrentTimeout();
  }

  public setCurrentTimeout() : void {
    this.currentTimeout = setTimeout(() => {
      this.updateCurrentAnimation(this.pendingAnimationId);
    }, this.COOL_DOWN);
  }

  public removedCurrentAnimation(animationId:number) : boolean {
    if (this.pendingAnimationId === animationId) {
      this.pendingAnimationId = null;
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
      return true;
    }

    return false;
  }

  public updateCurrentAnimation(animationId:number) : void {
    this.currentAnimation$.next(animationId);
  }

  public resetAnimation() : void {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.pendingAnimationId = null;
    this.setCurrentTimeout();
  }
}
