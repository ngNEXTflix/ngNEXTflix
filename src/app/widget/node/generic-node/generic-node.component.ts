import { Input, Component, Output, EventEmitter, HostBinding, ElementRef } from '@angular/core';

import { INode } from '../../../shared/models/INode';

@Component({
  selector: 'nextflix-generic-node',
  templateUrl: './generic-node.component.html',
  styleUrls: ['./generic-node.component.scss']
})
export class GenericNodeComponent {
  // #Input Members#
  @Input() public viewModel:INode;
  @Input() public isCurrentNode:boolean;
  @Input() public isSelected:boolean;
  @Input() public preventHover:boolean;
  @Input() public preventPlaycardDetails:boolean;

  // #Output Members#
  @Output() public openPlaycardDetails = new EventEmitter<any>();
  @Output() public hoverState = new EventEmitter<any>();

  // #HostBinding Members#
  @HostBinding('class.stretch-to-col-4') public isHovered:boolean;

  // #Public Members#
  public minimumHeight:number;

  // #CTOR#
  constructor(private elementRef:ElementRef) {
    this.minimumHeight = 0;
  }

  // #UI Functions#
  public isPlatformNode() : boolean {
    return !this.isPlaycardNode();
  }

  public isPlaycardNode() : boolean {
    return this.viewModel && this.viewModel.nodeTypeId === 5;
  }

  public viewPlaycardDetails() : void {
    this.openPlaycardDetails.emit();
  }

  public handleHoverState(event:any) : void {
    this.setIsHovered(event);
    this.setMinimumHeight(event);
    this.hoverState.emit(event);
  }

  private setIsHovered(event:any) : void {
    this.isHovered = ((event.isHovered && event.endHover) ||
    (!event.isHovered && event.hoverType === 'focusOut')) && !this.preventHover;
  }

  private setMinimumHeight(event:any) {
    this.minimumHeight = event.hoverType === 'focusIn' 
      ? this.elementRef.nativeElement.children[0].offsetHeight 
      : this.isHovered
        ? this.minimumHeight
        : 0;
  }

  public resetMinimumHeight() : void {
    this.minimumHeight = 0;
  }

  @HostBinding('class.col-2')
  public isNode() : boolean {
    return true;
  }
}
