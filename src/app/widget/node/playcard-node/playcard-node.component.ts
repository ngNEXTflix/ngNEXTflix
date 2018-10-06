import { Input, OnChanges, Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { HoverAnimationDelayService } from '../../../core/services/hover-animation-delay.service';
import { ComingSoonPicRetrieverService } from './coming-soon-pic-retriever/coming-soon-pic-retriever.service';
import { AnimationDistanceService } from './animation-distance/animation-distance.service';
import { IPlayCardNode } from '../../../shared/models/IPlayCardNode';

@Component({
  selector: 'nextflix-playcard-node',
  templateUrl: './playcard-node.component.html',
  animations: [
    trigger('scaleNodes', [
      transition('* => focusIn', animate('300ms ease', style({
        transform: 'scale(2.03,2)'
      }))),
      transition('focusIn => focusOut', animate('300ms ease', style({
        transform: 'scale(0.5)'
      })))
    ]),
    trigger('fadeElement', [
      transition('* => focusIn', animate('700ms ease', style({
        opacity: 1
      }))),
      transition('* => focusOut', animate('350ms ease', style({
        transform: 'translateY({{distanceY}})',
        opacity: 0
      })))
    ]),
    trigger('slideText', [
      transition('* => focusIn', animate('300ms ease', style({
        transform: 'translateY({{distanceY}})',
      }))),
      transition('* => focusOut', animate('300ms ease', style({
        transform: 'translateY({{distanceY}})'
      })))
    ])
  ],
  styleUrls: ['./playcard-node.component.scss']
})
export class PlaycardNodeComponent implements OnInit, OnChanges, OnDestroy {
  // #Input Members#
  @Input() public nodeDetails: IPlayCardNode;
  @Input() public isCurrentNode: boolean;
  @Input() public isSelected: boolean;
  @Input() public preventHover: boolean;
  @Input() public preventPlaycardDetails: boolean;

  @Output() public openPlaycardDetails = new EventEmitter<any>();
  @Output() public hoverState = new EventEmitter<any>();

  // #Public Members#
  public description: string;
  public fadeElementDescription: string;
  public comingSoon: boolean;
  public pic: string;
  public name: string;
  public isNodeDoneScaling: boolean;
  public isNodeInHoverState: boolean;
  public viewModel: IPlayCardNode;

  // #Private Members#
  private DEFAULT_DESCRIPTION_TEXT: string;
  private animationDelaySubscription: Subscription;

  // #CTOR#
  constructor(private _hoveredAnimationDelayService:HoverAnimationDelayService, 
    private _comingSoonPicRetrieverService:ComingSoonPicRetrieverService,
    private _animationDistanceService:AnimationDistanceService) {
    this.DEFAULT_DESCRIPTION_TEXT =
      'We are currently developing this, just for you. This Play is coming soon, to a WalkMe Editor near you! Thank you.';
  }

  // #UI Functions#
  public ngOnInit() : void {
    this.updateInternalDataMembers();
    this.configureAnimationDefaults();
    this.subscribeToCurrentHoveredNode();
  }

  public ngOnDestroy() : void {
    this.animationDelaySubscription.unsubscribe();
  }

  public ngOnChanges() : void {
    this.updateInternalDataMembers();
  }

  public viewPlaycardDetails() : void {
    if (this.preventHover) {
      return;
    }

    this.setHovered(false);
    this.openPlaycardDetails.emit();
  }

  public mouseEnter() : void {
    if (!this.viewModel.isHovered && (this.doesPlayHaveTemplateEditorAccount(this.viewModel) ||
      this.doesPlayHaveCssTemplate(this.viewModel))) {
      this._hoveredAnimationDelayService.setAnimation(this.viewModel.id);
    }
  }

  public mouseLeave() : void {
    if (this.viewModel.isNodeScaleAnimating) {
      this.viewModel.isHovered
        ? null
        : this._hoveredAnimationDelayService.triggerHoverLeave(this.viewModel.id);
      return;
    }

    if (!this._hoveredAnimationDelayService.removedCurrentAnimation(this.viewModel.id) || this.viewModel.isHovered) {
      this.setHovered(false);
    }
  }

  private subscribeToCurrentHoveredNode() : void {
    this.animationDelaySubscription = this._hoveredAnimationDelayService.getAnimation()
      .subscribe((nodeId:number) => {
        if (nodeId === this.viewModel.id) {
          this.setHovered(!this.viewModel.isHovered);
        } else if (this.viewModel.isHovered && nodeId !== this.viewModel.id) {
          this.setHovered(false);
        }
      });
  }
  public setHovered(isHovered:boolean) : void {
    if (this.shouldNotScale(this.viewModel, isHovered)) {
      return;
    }

    this.preventHover 
      ? null
      : this.viewModel.nodeScaleValue = isHovered ? 'focusIn' : 'focusOut';

    this.hoverState.emit({
      hoverType: this.viewModel.nodeScaleValue,
      isHovered: isHovered
    });
  }

  public nodeScaleAnimationStart(event:any) {
    this.viewModel.isNodeScaleAnimating = true;
    if (event.toState === 'focusOut') {
      this.isNodeDoneScaling = false;
    }
  }

  public nodeScaleAnimationEnd(event:AnimationEvent) {
    this.viewModel.isNodeScaleAnimating = false;
    if (event.fromState === 'void' && event.toState === 'void') {
      return;
    }

    if (event.toState === 'focusOut') {
      this.animationFocusOut();
      return;
    }

    if (event.toState === 'focusIn') {
      this.animationFocusIn();
    }
  }

  public fadeElementAnimationStart() {
    this.fadeElementDescription = this.description;
  }

  public fadeElementAnimationEnd(event:AnimationEvent) {
    if (event.toState === 'focusOut') {
      this.fadeElementDescription = '';
    }
  }

  public triggerAnimation(elementName?:string) : object|string {
    if (this.viewModel.nodeScaleValue !== undefined) {
      return {
        value: this.viewModel.nodeScaleValue,
        params: this._animationDistanceService.getAnimationParameters(elementName, this.viewModel.nodeScaleValue)
      };
    }
    return 'void';
  }

  public getNameBottomValue() : number {
    return this._animationDistanceService.getNameBottomValue(this.viewModel.isHovered)
  }
  
  public getDescriptionBottomValue() : number {
    return this._animationDistanceService.getDescriptionBottomValue(this.viewModel.isHovered)
  }
  
  // #Private Functions#
  private configureAnimationDefaults() : void {
    this.isNodeDoneScaling = true;
    this.viewModel.isHovered = false;
  }

  private shouldNotScale(entry:IPlayCardNode, isHovered:boolean) {
    return !(this.doesPlayHaveTemplateEditorAccount(entry) || this.doesPlayHaveCssTemplate(entry))||
      (isHovered && this.viewModel.nodeScaleValue === 'focusIn');
  }

  private doesPlayHaveTemplateEditorAccount(play:IPlayCardNode) : boolean {
    return !!(play.PlayCard && play.PlayCard.TemplateEditorAccount
      && play.PlayCard.TemplateEditorAccount.templateEditorAccountEmail);
  }

  private doesPlayHaveCssTemplate(play:IPlayCardNode) : boolean {
    return !!(play.PlayCard && play.PlayCard.TemplateEditorAccount
      && play.PlayCard.TemplateEditorAccount && play.PlayCard.TemplateEditorAccount.cssTemplatesId);
  }

  private updateInternalDataMembers() : void {
    this.viewModel = this.viewModel || Object.assign({}, this.nodeDetails);
    this.comingSoon = this.isComingSoon();
    this.pic = this.pic || this.viewModel.PlayCard && this.viewModel.PlayCard.PlaycardImages && this.viewModel.PlayCard.PlaycardImages[0] && this.viewModel.PlayCard.PlaycardImages[0].url
      || this._comingSoonPicRetrieverService.getComingSoonPic(this.viewModel.id, this.viewModel.parentId);
    this.description = this.getDescription();
    this.name = this.viewModel.PlayCard && this.viewModel.PlayCard.name || this.viewModel.name;
    this.viewModel.isPlayInPptBuilder = false;
    this.viewModel.isPlayInFavorites = false;
  }

  private isComingSoon() : boolean {
    return !(this.viewModel.PlayCard  && this.viewModel.PlayCard.TemplateEditorAccount &&
      (this.viewModel.PlayCard.TemplateEditorAccount.templateEditorAccountEmail || this.viewModel.PlayCard.TemplateEditorAccount.cssTemplatesId));
  }

  private getDescription() : string {
    return this.viewModel.PlayCard && this.viewModel.PlayCard.solution || this.DEFAULT_DESCRIPTION_TEXT
  }

  private animationFocusOut() : void {
    this.isNodeInHoverState = false;
    this.isNodeDoneScaling = true;
    this.viewModel.isHovered = false;

    this.hoverState.emit({
      endHover: true,
      isHovered: false
    });
  }

  private animationFocusIn() : void {
    this.isNodeInHoverState = true;
    this.viewModel.isHovered = true;

    this.hoverState.emit({
      endHover: true,
      isHovered: true
    });
  }
}
