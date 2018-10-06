import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { AnimationDistanceService } from '../playcard-node/animation-distance/animation-distance.service';
import { IPlayCardNode } from '../../../shared/models/IPlayCardNode';

@Component({
  selector: 'nextflix-playcard-side',
  templateUrl: './playcard-side.component.html',
  animations: [
    trigger('slideIcon', [
      transition('* => focusIn', animate('300ms ease', style({
        transform: 'translate({{distanceX}},{{distanceY}})',
        opacity: 1
      }))),
      transition('* => focusOut', [
        animate('300ms ease', style({
          transform: 'translate({{distanceX}},{{distanceY}})',
          opacity: 0
        }))
      ])
    ]),
  ],
  styleUrls: ['./playcard-side.component.scss']
})
export class PlaycardSideComponent implements OnInit {

  // #Output Members#
  @Output() public openPlaycardDetails = new EventEmitter<any>();

  public iconList : string[];
  public iconTotal: number;
  // #Input Members#
  @Input() public viewModel: IPlayCardNode;
  @Input() public preventPlaycardDetails: boolean;

  // #CTOR#
  constructor(private _animationDistanceService:AnimationDistanceService) {
    this.iconList = ['eye', 'ate', 'ppt', 'heart'];
  }

  public ngOnInit() {
    if (this.isCssPlay()) {
      this.removeNonCssIcons();
    }

    if (this.preventPlaycardDetails) {
      const eyeIndex = this.iconList.indexOf('eye');
      if (eyeIndex > -1) {
        this.iconList.splice(eyeIndex, 1);
      }
    }
    this.iconTotal = this.iconList.length;
  }
  // #UI Functions#
  public triggerAnimation(index?: number) : object|string {
    if (this.viewModel.nodeScaleValue !== undefined) {
      const animationMappingIndex = (this.iconTotal - index).toString();
      return {
        value: this.viewModel.nodeScaleValue,
        params: this._animationDistanceService.getAnimationParameters(animationMappingIndex, this.viewModel.nodeScaleValue)
      };
    }
    return 'void';
  }

  public addToPptBuilder(event:MouseEvent) : void {
    event.stopPropagation();
    this.viewModel.isPlayInPptBuilder = true;
  }

  public removeFromPptBuilder(event:MouseEvent) : void {
    event.stopPropagation();
    this.viewModel.isPlayInPptBuilder = false;
  }

  public addFavorite(event:MouseEvent) : void {
    event.stopPropagation();
    this.viewModel.isPlayInFavorites = true;
  }

  public removeFavorite(event:MouseEvent) : void {
    event.stopPropagation();
    this.viewModel.isPlayInFavorites = false;
  }
  
  public viewPlaycardDetails() : void {
    if (this.preventPlaycardDetails) {
      return;
    }

    this.openPlaycardDetails.emit();
  }

  public buttonHandler(buttonType:string, event:MouseEvent) : void {
    if (buttonType === 'ate') {
      return;
    }

    if (buttonType === 'eye') {
      this.viewPlaycardDetails();
      return;
    }

    let isPlayContained = false;
    if (buttonType === 'heart') {
      isPlayContained = this.viewModel.isPlayInFavorites;
    } else if (buttonType === 'ppt') {
      isPlayContained = this.viewModel.isPlayInPptBuilder;
    }
    
    isPlayContained 
      ? buttonType === 'ppt' 
        ? this.removeFromPptBuilder(event)
        : this.removeFavorite(event)
      : buttonType === 'ppt'
        ? this.addToPptBuilder(event)
        : this.addFavorite(event);
  }

  public getButtonState(icon:string) : string {
    let isPlayContained = false;
    if (icon === 'heart') {
      isPlayContained = this.viewModel.isPlayInFavorites;
    } else if (icon === 'ppt') {
      isPlayContained = this.viewModel.isPlayInPptBuilder;
    }

    return isPlayContained ? 'remove' : 'add';
  }

  public getActionHolderRightValue() : number {
    return this._animationDistanceService.getActionHolderRightValue(this.viewModel.isHovered);
  }

  public isCssPlay() : boolean {
    return !!(this.viewModel && this.viewModel.PlayCard && this.viewModel.PlayCard.TemplateEditorAccount
        && this.viewModel.PlayCard.TemplateEditorAccount.cssTemplatesId);
  }

  private removeNonCssIcons() : void {
    const pptIndex = this.iconList.indexOf('ppt');
    if (pptIndex > -1) {
      this.iconList.splice(pptIndex, 1);
    }

    const ateIndex = this.iconList.indexOf('ate');
    if (ateIndex > -1) {
      this.iconList.splice(ateIndex, 1);
    }
  }
}
