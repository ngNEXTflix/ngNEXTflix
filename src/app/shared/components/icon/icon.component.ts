import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nextflix-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  // #Private Members#
  private iconNameMapper:Object;
  private iconTitleMapper:Object;

  // #Public Members#
  public showTip:boolean;

  // #Input Members#
  @Input() public state:string;
  @Input() public toolTip:string;
  @Input() public iconType:string;

  // #CTOR#
  constructor() {
    this.iconTitleMapper = {
      'eye': () => 'View Play',
      'ate': () => 'Add to Editor',
      'ppt': this.getText('ppt'),
      'heart': this.getText('heart')
    };

    this.iconNameMapper = {
      'heart': 'Favorites',
      'ppt': 'Presentation'
    };

    this.showTip = false;
  }

  // #Public Methods#
  public setTip(state:boolean) : void {
    this.showTip = state;
  }

  public getIconTitle() : string {
    return this.iconTitleMapper[this.iconType]();
  }

  public getStateText() : string {
    return this.state === 'add'
      ? 'Add to'
      : 'Remove from';
  }

  public iconName() : string {
    return this.iconNameMapper[this.iconType];
  }

  public getText(iconType:string) : Function {
    return () => {
      return `${this.getStateText()} ${this.iconName()}`
    }
  }
}
