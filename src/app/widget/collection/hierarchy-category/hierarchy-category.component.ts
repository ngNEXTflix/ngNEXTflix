import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { GenericRowComponent } from '../generic-row/generic-row.component';

import { INode } from '../../../shared/models/INode';
import { Router, ActivatedRoute } from '@angular/router';
import { HoverAnimationDelayService } from '../../../core/services/hover-animation-delay.service';
import { HierarchyService } from '../../../core/services/hierarchy.service';


@Component({
  selector: 'nextflix-hierarchy-category',
  templateUrl: './hierarchy-category.component.html',
  animations: [
    trigger('slideNodes', [
      transition('* => left', animate('1000ms ease', style({
        transform: 'translateX(500%)'
      }))),
      transition('* => right', animate('1000ms ease', style({
        transform: 'translateX(-500%)'
      }))),
    ]),
    trigger('shiftNodes', [
      transition('* => shift', animate('300ms ease', style({
        transform: 'translateX({{direction}})'
      })))
    ])
  ],
  styleUrls: ['./hierarchy-category.component.scss']
})
export class HierarchyCategoryComponent extends GenericRowComponent implements OnInit {
  // #Const Members#
  private DEFAULT_INACTIVE_POSITION = 91.7;
  private OFFSCREEN_POSITION = 108.5;

  // #Input Members#
  @Input() public viewModel: INode;

  // #Private Members#
  private activeNodeIndices: Array<number>;
  private isScrollDirty: boolean;
  // #Public Members#
  public activeRow:INode[];
  public leftInactiveRow:INode[];
  public rightInactiveRow:INode[];
  public totalChildren:number;
  public currentIndex:number;
  public hoverState:boolean;
  public leftPreview:INode;
  public rightPreview:INode;
  public pageNodeWidth:number;
  public pageIndicators:Array<number>;
  public pageIndex:number;
  public isCarouselNeeded:boolean;
  public slideDirection:string;
  public isSlideAnimating:boolean;

  // #CTOR#
  constructor(myElement:ElementRef, private router:Router, private activatedRoute:ActivatedRoute,
              hoveredAnimationDelayService:HoverAnimationDelayService, private hierarchyService:HierarchyService) {
    super(myElement, hoveredAnimationDelayService);
    this.setDefaultProperties();
  }

  public provideData() {
    return this.viewModel;
  }

  // #Angular Events#
  public ngOnInit() : void {
    this.totalChildren = this.viewModel.children.length;
    this.isCarouselNeeded = this.totalChildren > this.MAX_VISIBLE_NODES && this.containsValidChildrenAmount(this.MAX_VISIBLE_NODES);

    this.pageNodeWidth = (this.totalChildren >= this.MAX_VISIBLE_NODES)
      ? 100 * (1  / Math.min(this.MAX_VISIBLE_NODES))
      : 50;
    this.pageIndicators = this.isCarouselNeeded
      ? new Array(Math.ceil(this.totalChildren / this.MAX_VISIBLE_NODES)).fill(0).map((x, i) => i)
      : null;

    this.setRows();
    this.configureAnimationDefaults(this.viewModel.children.length);
  }

  // #UI Functions#
  public canShowNext() : boolean {
    return this.hoverState && (this.isCarouselNeeded || this.isScrollDirty);
  }

  public canShowPrev() : boolean {
    return this.hoverState && this.isScrollDirty;
  }

  public getNextPage(event:any) : void {
    event.stopPropagation();
    this.slideDirection = 'right';
    this.isScrollDirty = true;
    this.pageIndex = this.modulePageIndicatorsLength(this.pageIndex + 1);

    this.updateCurrentIndex(this.MAX_VISIBLE_NODES);
  }

  public getPrevPage(event:MouseEvent) : void {
    event.stopPropagation();
    if (!this.canShowPrev()) {
      return;
    }
    this.slideDirection = 'left';
    this.isScrollDirty = true;
    this.pageIndex = this.modulePageIndicatorsLength(this.pageIndex - 1);

    this.updateCurrentIndex(-1 * this.MAX_VISIBLE_NODES);
  }

  public canShowLeftPreview() : boolean {
    return this.leftPreview && this.isScrollDirty;
  }

  public canShowRightPreview() : boolean {
    return this.rightPreview && this.isCarouselNeeded;
  }

  public categoryEnter() : void {
    this.hoverState = true;
  }

  public categoryLeave() : void {
    this.hoverState = false;
  }

  public nodeEnter(index:number, entry:INode) : void {
    if (this.isSlideAnimating) {
      return;
    }

    super.nodeEnter(index, entry);
  }

  public nodeLeave(index:number, entry:INode) : void {
    if (this.shouldNotScale(entry) || this.isSlideAnimating || this.isActive) {
      return;
    }

    super.nodeLeave(index, entry);
  }

  public shouldNotScale(entry:INode) {
    return entry.nodeTypeId < 4 || !(this.doesPlayHaveTemplateEditorAccount(entry) || this.doesPlayHaveCssTemplate(entry));
  }

  public configureAnimationDefaults(length:number) : void {
    this.isSlideAnimating = false;
    super.configureAnimationDefaults(length);
  }

  public triggerShift(index:number) : any {
    if (this.isActive && this.isSlideAnimating) {
      if (this.currentNodeIndex === index) {
        this.nodeShiftDone[index] = true;
      }
      return 'void';
    }
    return super.triggerShift(index);
  }

  public isHiddenLeftPreview(index:number) : boolean {
    return this.isCarouselNeeded && !this.isScrollDirty && index <= this.MAX_VISIBLE_NODES;
  }

  public isPlayValidModule() : boolean {
    return this.viewModel && this.isValidNodeTypeId() && this.viewModel.children && this.hasEnoughChildren();
  }

  public leftInactiveShouldExist() : boolean {
    return this.leftInactiveRow && !this.isHiddenLeftPreview(this.leftInactiveRow.length - 1);
  }

  public nodeSlideAnimationEnd(event:AnimationEvent) {
    this.slideDirection = undefined;
    this.setRows();
    this.isSlideAnimating = false;
    if (event.toState === 'left' || event.toState === 'right') {
      this.hoverAnimationDelayService.resetAnimation();
    }
  }

  public nodeSlideAnimationStart() {
    this.isSlideAnimating = true;
  }

  public calculateInactiveRowPosition() : number {
    if (this.isNodeShiftAnimating && this.nodeHoverState) {
      return this.OFFSCREEN_POSITION;
    }
    return this.DEFAULT_INACTIVE_POSITION;
  }

  public handlePreventHover() : boolean {
    return (this.selectedPlay && this.isActive) || this.isSlideAnimating;
  }

  // #Private Functions#
  private isActiveNode(index:number) : boolean {
    return this.activeNodeIndices.indexOf(index) > -1;
  }

  private isValidNodeTypeId() : boolean {
    return this.router.url.indexOf('favorites') === -1 
      ? this.viewModel.nodeTypeId === 4 
      : this.viewModel.nodeTypeId === 3;
  }

  private hasEnoughChildren() : boolean {
    return this.router.url.indexOf('favorites') === -1 
      ? this.containsValidChildrenAmount(8) 
      : this.containsValidChildrenAmount(5)
  }

  private setDefaultProperties() : void {
    this.pageIndex = 0;
    this.currentIndex = 0;
    this.isScrollDirty = false;
    this.activeNodeIndices = [];
    for (let j = 0; j < this.MAX_VISIBLE_NODES; j++) {
      this.activeNodeIndices.push( this.MAX_VISIBLE_NODES + 1 + j );
    }
  }
  private updateCurrentIndex(stepVector:number) : void {
    this.currentIndex = this.moduloArrayLength(this.currentIndex + stepVector);
  }

  private setRows() : void {
    const resultDiv = [];
    const visibleDivs = this.viewModel.children.slice(this.currentIndex, this.currentIndex + this.MAX_VISIBLE_NODES);
    if (visibleDivs.length < this.MAX_VISIBLE_NODES && visibleDivs.length !== this.viewModel.children.length) {
      visibleDivs.push.apply(visibleDivs, this.viewModel.children.slice(0, (this.MAX_VISIBLE_NODES - visibleDivs.length)));
    }
    if (this.viewModel.children.length > this.MAX_VISIBLE_NODES && this.isCarouselNeeded) {
      this.addNodesLeft(resultDiv);
      resultDiv.push.apply(resultDiv, visibleDivs);
      this.addNodesRight(resultDiv);
    } else {
      this.activeRow = visibleDivs;
      return;
    }

    this.configureEachRow(resultDiv);
  }

  private configureEachRow(resultDiv:INode[]) {
    this.activeRow = resultDiv.filter((node, index) => {
      return this.isActiveNode(index);
    });
    this.leftInactiveRow = resultDiv.filter((node, index) => {
      return !this.isActiveNode(index) && index < this.activeNodeIndices[0];
    });
    this.rightInactiveRow = resultDiv.filter((node, index) => {
      return !this.isActiveNode(index) && index > this.activeNodeIndices[this.activeNodeIndices.length - 1];
    });
  }

  private addNodesLeft(resultDiv:Array<INode>) {
   for (let k = this.MAX_VISIBLE_NODES + 1; k > 0; k--) {
     resultDiv.push(this.viewModel.children[this.moduloArrayLength(this.currentIndex - k)]);
   }
  }

  private addNodesRight(resultDiv:Array<INode>) {
    for (let k = 0; k < this.MAX_VISIBLE_NODES + 1; k++) {
     resultDiv.push(this.viewModel.children[this.moduloArrayLength(this.currentIndex + this.MAX_VISIBLE_NODES + k)]);
    }
  }

  private moduloArrayLength(index:number) : number {
    return (index + this.totalChildren) % this.totalChildren;
  }

  private modulePageIndicatorsLength(index:number) : number {
    return (index + this.pageIndicators.length) % this.pageIndicators.length;
  }

  private setActivePage() {
    this.pageIndex = Math.floor(this.currentIndex / this.MAX_VISIBLE_NODES);
  }

  private containsValidChildrenAmount(minimum:number) : boolean {
    return this.viewModel.children
      .filter((node) => {
        return this.doesPlayHaveTemplateEditorAccount(node);
      }).length > 0;
  }
}
