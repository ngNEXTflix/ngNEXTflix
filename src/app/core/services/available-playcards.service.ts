import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { INode } from '../../shared/models/INode';

import * as _ from 'underscore';

@Injectable()
export class AvailablePlaycardsService {
  // #Private Members#
  private currentIndex:number;
  private currentHierarchyLevel:INode[];
  private playcardName$:BehaviorSubject<string>;

  // #CTOR#
  constructor() {
    this.playcardName$ = new BehaviorSubject<string>(null);
    this.currentHierarchyLevel = [];
  }

  public setAvailablePlaycards(hierarchyLevel:INode, playcardId:number) : void {
    let indexOfPlaycardId = 0;
    let indexFound = false;
    this.currentHierarchyLevel = _.map(hierarchyLevel.children, (child) => {
      if (child.PlayCard && child.PlayCard.TemplateEditorAccount && child.PlayCard.TemplateEditorAccount.templateEditorAccountEmail) {
        if (playcardId === child.PlayCard.id) {
          indexFound = true;
        } else {
          indexOfPlaycardId++;
        }

        return child;
      }
    });

    this.currentIndex = indexOfPlaycardId;
  }

  public isAvailable() {
    return this.currentHierarchyLevel.length > 1;
  }

  public getNextPlaycardNode() : INode {
    this.setNextPlaycardIndex();
    this.playcardName$.next(this.currentHierarchyLevel[this.currentIndex].PlayCard.name);

    return this.currentHierarchyLevel[this.currentIndex];
  }

  private setNextPlaycardIndex() : void {
    this.currentIndex = (this.currentIndex + 1 < this.currentHierarchyLevel.length)
      ? this.currentIndex + 1
      : 0;
  }

  public getPreviousPlaycardNode() : INode {
    this.setPreviousPlaycardIndex();
    this.playcardName$.next(this.currentHierarchyLevel[this.currentIndex].PlayCard.name);

    return this.currentHierarchyLevel[this.currentIndex];
  }

  private setPreviousPlaycardIndex() : void {
    this.currentIndex = (this.currentIndex - 1 > -1)
      ? this.currentIndex - 1
      : this.currentHierarchyLevel.length - 1;
  }

  public getPlaycardName() : Observable<string> {
    return this.playcardName$.asObservable();
  }
}
