import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { INode } from '../../../shared/models/INode';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { IPlayCard } from '../../../shared/models/IPlayCard';

export class GenericDetailsComponent implements OnInit, OnChanges {
	// #Input Members#
  @Input() public inputViewModel:INode;
  public viewModel:IPlayCard;

  // #Output Members#
  @Output() public closePlaycardDetails = new EventEmitter<any>();
  private currentAnimation:string;
  constructor() { }

   public ngOnInit() : void {
    this.currentAnimation = 'fadeIn';
  }

  public ngOnChanges() : void {
  	if (this.inputViewModel) {
      this.currentAnimation = 'fadeLeft';
  	}
  }

  public closeDetails() : void {
  	this.closePlaycardDetails.emit();
  }

  public clear(event:MouseEvent) : void {
    event.stopPropagation();
    this.currentAnimation = 'fadeOut';
  }

  public triggerFade(isContainer:boolean) : string {
    if (this.currentAnimation) {
      return (isContainer && this.currentAnimation === 'fadeLeft')
        ? 'void'
        : this.currentAnimation;
    }

    return 'void';
  }

  public fadeAnimationEnd(event:AnimationEvent) : void {
    if (event.toState === 'fadeOut') {
      this.inputViewModel = undefined;
      this.viewModel = undefined;
      this.closePlaycardDetails.emit();
    }

    this.currentAnimation = null;
  }
}
