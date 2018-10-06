import { Subscription } from 'rxjs/Subscription';

import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { IPlayCard } from '../../../shared/models/IPlayCard';
import { INode } from '../../../shared/models/INode';

import { HierarchyService } from '../../../core/services/hierarchy.service';
import { AvailablePlaycardsService } from '../../../core/services/available-playcards.service';

import { GenericDetailsComponent } from '../generic-details/generic-details.component';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'plb-playcard-details',
  templateUrl: './playcard-details.component.html',
  animations: [
    trigger('fade', [
      transition('void => fadeIn', [
        style({ opacity: 0, height: '0px' }),
        animate('1050ms ease', style({
          opacity: 1,
          height: '475px',
        })),
        style({})
      ]),
      transition('void => fadeOut', [
        style({ opacity: 1 }),
        animate('1050ms ease', style({
          opacity: 0,
          height: '60px'
        }))
      ]),
      transition('void => fadeLeft', [
        style({ opacity: 0, left: '25px' }),
        animate('1050ms ease', style({
          opacity: 1,
          left: '0px'
        }))
      ])
    ])
  ],
  styleUrls: ['./playcard-details.component.scss']
})
export class PlaycardDetailsComponent extends GenericDetailsComponent implements OnInit, OnDestroy, OnChanges {
  // #Private Members#
  private hierarchy:INode;
  private hierarchySubscription:Subscription;

  // #Public Members#
  public currentPicIndex:any;
  public hasMultiplePics:boolean;
  public viewModel:IPlayCard;
  public hasPic:boolean;
  public linkWidth:number;
  public isPlaySaved:boolean;
  public isPlayInFavorites:boolean;
  public videoUrl:string;

  

  // #CTOR#
  constructor(private hierarchyService:HierarchyService,
              private availablePlaycardsService:AvailablePlaycardsService, private domSanitizer:DomSanitizer) {
    super();
  }

  // #UI Functions#
  public ngOnInit() : void {
    super.ngOnInit();
    this.configureInternalDataMembers(this.inputViewModel);
  }

  public ngOnDestroy() : void {
    this.hierarchySubscription && this.hierarchySubscription.unsubscribe();
  }

  public ngOnChanges() : void {
    super.ngOnChanges();
    if (this.inputViewModel) {
      this.configureInternalDataMembers(this.inputViewModel);
    }
  }

  public nextPicture() : void {
    this.currentPicIndex = (this.currentPicIndex + 1 + this.viewModel.pic.length) % this.viewModel.pic.length;
  }

  

  // #Private Functions#
  private configureDefaults() : void {
    this.currentPicIndex = (this.viewModel && this.viewModel.pic && this.viewModel.pic.length) ? 0 : null;
    this.hasPic = this.currentPicIndex !== null;

    this.hasMultiplePics = this.viewModel && this.viewModel.pic && this.viewModel.pic.length > 1;
    this.linkWidth = (this.viewModel && this.viewModel.implement && this.viewModel.video) ? 321 : 155;

    this.isPlaySaved = this.isPlayAlreadySaved();
    this.isPlayInFavorites = false;
  }

  private configureInternalDataMembers(hierarchy:INode) : void {
    this.viewModel = hierarchy.PlayCard;
    this.setAvailablePlaycards(hierarchy.parentId);
    this.hierarchy = hierarchy;
    this.configureDefaults();
    this.videoUrl = this.createVideoUrl();
  }

  private createVideoUrl() : string {
    return <string>this.domSanitizer.bypassSecurityTrustResourceUrl(this.viewModel.video);
  }

  private setAvailablePlaycards(playcardParentId:number) {
    const hierarchyLevel = this.hierarchyService.getHierarchy(playcardParentId);
    const playcardId = this.viewModel.id;

    this.availablePlaycardsService.setAvailablePlaycards(hierarchyLevel, playcardId);
  }

  // #UI Functions#
  public prevPicture() : void {
    this.currentPicIndex = (this.currentPicIndex - 1 + this.viewModel.pic.length) % this.viewModel.pic.length;
  }

  public addFavorite(event:MouseEvent) : void {
    event.stopPropagation();
    this.isPlayInFavorites = true;
  }

  public removeFavorite(event:MouseEvent) : void {
    event.stopPropagation();
    this.isPlayInFavorites = false;
  }

  public getButtonState(isPlayContained:boolean) : string {
    return isPlayContained ? 'remove' : 'add';
  }

  public buttonHandler(isPlayContained:boolean, event:MouseEvent) : void {
    isPlayContained 
      ? this.removeFavorite(event)
      : this.addFavorite(event);
  }

  public doesPlayCardHaveVideo() : boolean {
    return !!(this.viewModel && this.viewModel.video && this.viewModel.video.length);
  }

  public canShowPlaycards() : boolean {
    return this.availablePlaycardsService.isAvailable();
  }

  public getPrevPlaycard() : void {
    this.hierarchy = this.availablePlaycardsService.getPreviousPlaycardNode();
    this.viewModel = this.hierarchy.PlayCard;
    this.configureDefaults();
  }

  public getNextPlaycard() : void {
    this.hierarchy = this.availablePlaycardsService.getNextPlaycardNode();
    this.viewModel = this.hierarchy.PlayCard;
    this.configureDefaults();
  }

  public pptButtonHandler(isContained:boolean) : void {
    isContained ? this.removePlay() : this.savePlay();
  }

  // #Private Functions
  private isPlayAlreadySaved() : boolean {
    return false;
  }

  private savePlay() : void {
    this.isPlaySaved = true;
  }

  private removePlay() {
    this.isPlaySaved = false;
  }
}
