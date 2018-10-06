import { Component, OnInit } from '@angular/core';
import { INode } from '../../../shared/models/INode';
import { HierarchyService } from '../../../core/services/hierarchy.service';

@Component({
  selector: 'plb-hierarchy-layer',
  templateUrl: './hierarchy-layer.component.html',
  styleUrls: ['./hierarchy-layer.component.scss']
})
export class HierarchyLayerComponent implements OnInit {
  // #Public Members#
  public viewModel: INode;
  public activeCategory: INode;
  private ROOT_ID = 1;

  // #CTOR#
  constructor(private _hierarchyService:HierarchyService) { }

  // #Public Functions#
  public ngOnInit() : void {
    this.viewModel = this._hierarchyService.getHierarchy(3);
  }
  public isActiveCategory(category:INode) : boolean {
    return category === this.activeCategory;
  }

  public setActiveCategory(event:INode) : void {
    this.activeCategory = event;
  }
}
