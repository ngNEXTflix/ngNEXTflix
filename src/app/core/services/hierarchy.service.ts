import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { INode } from '../../shared/models/INode';

@Injectable()
export class HierarchyService {
  // #Private Members#
  private hierarchyNode: any;

  // #CTOR#
  constructor() {
    this.hierarchyNode = {
      "id": 3,
      "parentId": 2,
      "nodeTypeId": 3,
      "name": "Main Layer",
      "imageUrl": "https://i.imgur.com/3FMXrB0.png",
      "children": [
        {
          "id": 6,
          "parentId": 3,
          "nodeTypeId": 4,
          "name": "Gallery One",
          "children": [
            {
              "id": 7,
              "parentId": 6,
              "orderIndex": 0,
              "nodeTypeId": 5,
              "playcardId": 148,
              "name": "Main Picture One",
              "PlayCard": {
                "id": 148,
                "name": "Main Picture One",
                "challenge": "This is the description",
                "solution": "This the details",
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 26,
                  "playcardId": 148,
                  "templateEditorAccountEmail": "test@test.com"
                },
                "PlaycardImages": [
                  {
                    "id": 293,
                    "playcardId": 148,
                    "url": "https://i.imgur.com/3FMXrB0.png"
                  }
                ]
              }
            },
            {
              "id": 8,
              "parentId": 6,
              "orderIndex": 1,
              "nodeTypeId": 5,
              "playcardId": 149,
              "name": "Main Picture Two",
              "PlayCard": {
                "id": 149,
                "name": "Main Picture Two",
                "challenge": "This is the description",
                "solution": "This is the details",
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 25,
                  "playcardId": 149,
                  "templateEditorAccountEmail": "test@test.com",
                },
                "PlaycardImages": [
                  {
                    "id": 300,
                    "playcardId": 149,
                    "position": 0,
                    "url": "https://i.imgur.com/3FMXrB0.png"
                  }
                ]
              }
            },
            {
              "id": 9,
              "parentId": 6,
              "orderIndex": 2,
              "nodeTypeId": 5,
              "playcardId": 150,
              "name": "Main Picture Three",
              "PlayCard": {
                "id": 150,
                "name": "Main Picture Three",
                "challenge": "This is the description",
                "solution": "This is the details",
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 24,
                  "playcardId": 150,
                  "templateEditorAccountEmail": "test@test.com",
                },
                "PlaycardImages": [
                  {
                    "id": 299,
                    "playcardId": 150,
                    "position": 0,
                    "url": "https://i.imgur.com/3FMXrB0.png",
                    "seVisible": 0
                  }
                ]
              }
            },
            {
              "id": 11,
              "parentId": 6,
              "orderIndex": 3,
              "nodeTypeId": 5,
              "playcardId": 273,
              "name": "Main picture four",
              "PlayCard": {
                "id": 273,
                "name": "Main picture four",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": null,
                "PlaycardImages": []
              }
            },
            {
              "id": 12,
              "parentId": 6,
              "orderIndex": 4,
              "nodeTypeId": 5,
              "playcardId": 274,
              "name": "Main picture five",
              "PlayCard": {
                "id": 274,
                "name": "Main picture five",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "indication": "default",
                "TemplateEditorAccount": null,
                "PlaycardImages": []
              }
            },
            {
              "id": 13,
              "parentId": 6,
              "orderIndex": 5,
              "nodeTypeId": 5,
              "playcardId": 275,
              "name": "Main picture six",
              "PlayCard": {
                "id": 275,
                "name": "Main picture six",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": null,
                "PlaycardImages": []
              }
            },
            {
              "id": 14,
              "parentId": 6,
              "orderIndex": 6,
              "nodeTypeId": 5,
              "playcardId": 276,
              "name": "Main picture seven",
              "PlayCard": {
                "id": 276,
                "name": "Main picture eight",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": null,
                "PlaycardImages": []
              }
            },
            {
              "id": 15,
              "parentId": 6,
              "orderIndex": 7,
              "nodeTypeId": 5,
              "playcardId": 277,
              "name": "Main picture nine",
              "PlayCard": {
                "id": 277,
                "name": "Main picture nine",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 2,
                  "playcardId": 277,
                  "templateEditorAccountEmail": null
                },
                "PlaycardImages": []
              }
            },
            {
              "id": 16,
              "parentId": 6,
              "orderIndex": 8,
              "nodeTypeId": 5,
              "playcardId": 278,
              "name": "Main picture ten",
              "PlayCard": {
                "id": 278,
                "name": "Main picture ten",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": null,
                "PlaycardImages": []
              }
            }
          ]
        },
        {
          "id": 86,
          "parentId": 3,
          "orderIndex": 2,
          "nodeTypeId": 4,
          "name": "Gallery Two",
          "children": [
            {
              "id": 87,
              "parentId": 86,
              "orderIndex": 0,
              "nodeTypeId": 5,
              "playcardId": 151,
              "name": "Main picture one",
              "PlayCard": {
                "id": 151,
                "name": "Main picture one",
                "challenge": "This is the description",
                "solution": "This is the details",
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 23,
                  "playcardId": 151,
                  "templateEditorAccountEmail": "wd_timeofftemplate@walkme.com",
                  "cssTemplatesId": null,
                  "CssGeneratorTemplate": null
                },
                "PlaycardImages": [
                  {
                    "id": 312,
                    "playcardId": 151,
                    "position": 0,
                    "url": "https://i.imgur.com/3FMXrB0.png",
                    "seVisible": 0
                  }
                ]
              }
            },
            {
              "id": 88,
              "parentId": 86,
              "orderIndex": 1,
              "nodeTypeId": 5,
              "playcardId": 339,
              "name": "Main picture two",
              "PlayCard": {
                "id": 339,
                "name": "Main picture two",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 10,
                  "playcardId": 339,
                  "templateEditorAccountEmail": null
                },
                "PlaycardImages": []
              }
            },
            {
              "id": 89,
              "parentId": 86,
              "orderIndex": 2,
              "nodeTypeId": 5,
              "playcardId": 340,
              "name": "Main picture three",
              "PlayCard": {
                "id": 340,
                "name": "Main picture three",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 9,
                  "playcardId": 340,
                  "templateEditorAccountEmail": null,
                  "cssTemplatesId": null,
                  "CssGeneratorTemplate": null
                },
                "PlaycardImages": []
              }
            },
            {
              "id": 90,
              "parentId": 86,
              "orderIndex": 3,
              "nodeTypeId": 5,
              "playcardId": 341,
              "name": "Main picture four",
              "PlayCard": {
                "id": 341,
                "name": "Main picture four",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 8,
                  "playcardId": 341,
                  "templateEditorAccountEmail": null
                },
                "PlaycardImages": []
              }
            },
            {
              "id": 91,
              "parentId": 86,
              "orderIndex": 4,
              "nodeTypeId": 5,
              "playcardId": 342,
              "name": "Main picture five",
              "PlayCard": {
                "id": 342,
                "name": "Main picture five",
                "challenge": null,
                "solution": null,
                "video": "https://www.youtube.com/embed/Hp92T0Iw2cc",
                "implement": "https://ngnextflix.github.io/",
                "TemplateEditorAccount": {
                  "id": 7,
                  "playcardId": 342,
                  "templateEditorAccountEmail": null
                },
                "PlaycardImages": []
              }
            }
          ]
        }
  ]
    };
  }

  // #Public Methods#
  public getHierarchy(level) : INode {
    let currentHierarchyNode = null;
    _inner(this.hierarchyNode);

    return currentHierarchyNode;

    function _inner(_currentHierarchyNode: INode) : void {
      if (_currentHierarchyNode.id === Number(level)) {
        currentHierarchyNode = _currentHierarchyNode;
        return;
      } else if (!_currentHierarchyNode.children) {
        return;
      }

      for (let index = 0; index < _currentHierarchyNode.children.length; index++) {
        const child = _currentHierarchyNode.children[index];
        _inner(child);
      }
    }
  }
}
