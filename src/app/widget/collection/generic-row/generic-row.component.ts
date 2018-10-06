import { Input, Output, EventEmitter, SimpleChanges, ElementRef, OnChanges, Component } from '@angular/core';

import { INode } from '../../../shared/models/INode';
import { AnimationEvent } from '@angular/animations';
import { HoverAnimationDelayService } from '../../../core/services/hover-animation-delay.service';

export class GenericRowComponent implements OnChanges {
  // #Private Members#
  private SCROLL_DELAY:number;
  private SHIFT_ANIMATION_DELAY:number;
  private TOP_NAVBAR:number;
  private INDEX_LEFT_EDGE:number;
  private INDEX_RIGHT_EDGE:number;
  
  // #Public Members#
  public hoverAnimationDelayService:HoverAnimationDelayService;
  public MAX_VISIBLE_NODES:number;
  public pushOut:boolean;
  public selectedPlay:INode;
  public currentNodeIndex:number;
  public nodeShiftDone:boolean[];
  public nodeHoverState:boolean;
  public isNodeShiftAnimating:boolean;
  public myElement:ElementRef;
  public isPlayCardDetails: boolean;

  @Input() public isActive: boolean;
  @Output() public setActive = new EventEmitter<any>();

  // #CTOR#
  constructor(myElement:ElementRef, hoverAnimationDelayService:HoverAnimationDelayService) {
    this.myElement = myElement;
    this.hoverAnimationDelayService = hoverAnimationDelayService;
    this.MAX_VISIBLE_NODES = 5;
    this.SCROLL_DELAY = 700;
    this.SHIFT_ANIMATION_DELAY = 100;
    this.TOP_NAVBAR = 64;
    this.INDEX_LEFT_EDGE = -1;
    this.INDEX_RIGHT_EDGE = 5;
  }

  public ngOnChanges(changes:SimpleChanges) : void {
    this.checkForIsActiveChanges(changes);
  }

  // #Public Functions#
  public setActivePlay(event:any, play:INode, index:number) : void {
    this.nodeLeave(index, play);
    this.isPlayCardDetails = this.doesPlayHaveTemplateEditorAccount(play);
    if (!this.isPlayCardDetails && !this.doesPlayHaveCssTemplate(play)) {
      return;
    }

    this.removeActivePlay();
    this.setActive.emit(this.provideData(play));
    this.selectedPlay = play;

    if (!event) {
      setTimeout(() => {
        let top = this.myElement.nativeElement.offsetTop - this.TOP_NAVBAR;
        window.scrollTo({top: top, behavior: 'smooth'});
      }, this.SCROLL_DELAY);
    }
  }

  public provideData(item:INode) : INode {
    return item;
  }

  public removeActivePlay() : void {
    this.selectedPlay = undefined;
    this.setActive.emit();
  }

  public nodeEnter(index:number, entry:INode) : void {
    this.pushOut = true;
    this.currentNodeIndex = index;
  }

  public nodeLeave(index:number, entry:INode) : void {
    this.currentNodeIndex = index;
  }

  public handleHoverState(event:any, entry:INode, index:number) : void {
    if (event.endHover) {
      this.nodeHoverState = event.isHovered;
      return;
    }

    this.isActive
      ? this.setActivePlay(event, entry, index)
      : event.hoverType === 'focusIn'
        ? this.nodeEnter(index, entry)
        : this.nodeLeave(index, entry);
  }

  public checkForIsActiveChanges(changes:SimpleChanges) : void {
    const recentIsActive = changes.isActive;
    if (recentIsActive && recentIsActive.currentValue === false) {
      this.selectedPlay = undefined;
    }
  }

  public doesPlayHaveTemplateEditorAccount(play:INode) : boolean {
    return !!(play.PlayCard && play.PlayCard.TemplateEditorAccount && play.PlayCard.TemplateEditorAccount.templateEditorAccountEmail);
  }

  public doesPlayHaveCssTemplate(play:INode) : boolean {
    return !!(play.PlayCard && play.PlayCard.TemplateEditorAccount && play.PlayCard.TemplateEditorAccount.cssTemplatesId);
  }

  public configureAnimationDefaults(length:number) : void {
    this.MAX_VISIBLE_NODES = (length < this.MAX_VISIBLE_NODES) ? length : this.MAX_VISIBLE_NODES;
    this.nodeHoverState = false;
    this.currentNodeIndex = null;
    this.pushOut = false;
    this.nodeShiftDone = [];

    const numberOfNodes = length > this.MAX_VISIBLE_NODES ? this.MAX_VISIBLE_NODES : length;
    for (let i = 0; i < numberOfNodes; i++) {
      this.nodeShiftDone.push(false);
    }
  }

  public triggerShift(index:number) : any {
    if (this.currentNodeIndex === null || this.currentNodeIndex === index) {
      if (this.currentNodeIndex === index) {
        this.nodeShiftDone[index] = true;
      }

      return 'void';
    }

    let direction = index < this.currentNodeIndex;
    direction = this.pushOut ? direction : !direction;

    return {
      value: 'shift',
      params: {
        direction: `${direction ? '-' : ''}${(index === this.INDEX_RIGHT_EDGE || index === this.INDEX_LEFT_EDGE) ? 10 : 5}0%`
      }
    };
  }

  public nodeShiftAnimationStart(event:AnimationEvent, index:number) {
    if (event.fromState === 'void' && event.toState === 'void') {
      return;
    }
    this.nodeShiftDone[index] = false;
    this.isNodeShiftAnimating = true;
  }

  public nodeShiftAnimationEnd(event:AnimationEvent, index:number) {
    if (event.fromState === 'void' && event.toState === 'void') {
      return;
    }
    if (event.toState === 'shift') {
      this.pushOut = false;
      this.nodeShiftDone[index] = true;

      this.currentNodeIndex = null;

      if (this.isNodeShiftAnimationDone()) {
        setTimeout(() => {
          this.isNodeShiftAnimating = false;
        }, this.SHIFT_ANIMATION_DELAY);
      }
    }
  }

  public resetAnimation() : void {
    this.hoverAnimationDelayService.resetAnimation();
  }

  // #Private Methods#
  private isNodeShiftAnimationDone() : boolean {
    return this.nodeShiftDone.every((value) => {
      return value === true;
    });
  }
}
