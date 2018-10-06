import { Input, Component, OnInit } from '@angular/core';
import { IPlayCardNode } from '../../../shared/models/IPlayCardNode';

@Component({
  selector: 'nextflix-hovered-node',
  templateUrl: './hovered-node.component.html',
  styleUrls: ['./hovered-node.component.scss']
})
export class HoveredNodeComponent implements OnInit {

  // #Input Members#
  @Input() public viewModel: IPlayCardNode;

  // #Public Members#
  public name: string;
  public description: string;
  public comingSoon: boolean;
  public pic: string;

  // #Private Members#
  private DEFAULT_DESCRIPTION_TEXT: string;
  private LARGE_SCREEN_SIZE: number;
  private LARGE_SCREEN_PADDING: number;
  private SMALL_TO_MEDIUM_SCREEN_PADDING: number;

  constructor() {
    this.DEFAULT_DESCRIPTION_TEXT =
    'We are currently developing this, just for you. This Play is coming soon, to a WalkMe Editor near you! Thank you.';
    this.LARGE_SCREEN_SIZE = 1640;
    this.LARGE_SCREEN_PADDING = 2;
    this.SMALL_TO_MEDIUM_SCREEN_PADDING = 1;
  }

  // #Public Functions#
  public ngOnInit() : void {
    this.name = this.viewModel.PlayCard && this.viewModel.PlayCard.name || this.viewModel.name;
    this.description = this.getDescription();
    this.comingSoon = this.isComingSoon();
    this.pic = this.viewModel.PlayCard && this.viewModel.PlayCard.PlaycardImages && this.viewModel.PlayCard.PlaycardImages[0] && this.viewModel.PlayCard.PlaycardImages[0].url || ''; // #TODO: default image asset#
  }

  public getPic() : string {
    return this.pic;
  }

  public calculateBottomInfoPaddingTop() : number {
    if (window.innerWidth >= this.LARGE_SCREEN_SIZE) {
      return this.LARGE_SCREEN_PADDING;
    }
    return this.SMALL_TO_MEDIUM_SCREEN_PADDING;
  }

  // #Private Functions#
  private getDescription() : string {
    return this.viewModel.PlayCard && this.viewModel.PlayCard.solution || this.DEFAULT_DESCRIPTION_TEXT;
  }

  private isComingSoon() : boolean {
    return !(this.viewModel.PlayCard  && this.viewModel.PlayCard.TemplateEditorAccount &&
      (this.viewModel.PlayCard.TemplateEditorAccount.templateEditorAccountEmail || this.viewModel.PlayCard.TemplateEditorAccount.cssTemplatesId));
  }
}
