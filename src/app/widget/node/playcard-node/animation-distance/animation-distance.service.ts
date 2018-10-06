import { Injectable } from '@angular/core';

@Injectable()
export class AnimationDistanceService {
  
  // #Private Members#
  private animationDistanceMapper: Object;
  private descriptionMapper: Object;
  private nameMapper: Object;
  private actionHolderMapper: Object;
  private SMALL_WINDOW_SIZE: string;
  private MEDIUM_WINDOW_SIZE: string;
  private LARGE_WINDOW_SIZE: string;
  private extraSmallWindowSize: number;
  private smallWindowSize: number;
  private lowerMediumWindowSize: number;
  private mediumWindowSize: number;
  private largeWindowSize: number;

  // #CTOR#
  constructor() {
    this.SMALL_WINDOW_SIZE = 'nextflix-screen-small';
    this.MEDIUM_WINDOW_SIZE = 'nextflix-screen-medium';
    this.LARGE_WINDOW_SIZE = 'nextflix-screen-large';
    this.animationDistanceMapper = {};
    this.animationDistanceMapper['standard-y'] = {
      '4': {
        'focusIn': -111,
        'focusOut': 81,
      },
      '3': {
        'focusIn': -74, 
        'focusOut': 44
      },
      '2': {
        'focusIn': -37, 
        'focusOut': 7
      },
      '1': {
        'focusIn': 0,
        'focusOut': 0
      },
      'description': {
        'focusIn': 0,
        'focusOut': -40
      }
    };
    
    this.animationDistanceMapper[this.SMALL_WINDOW_SIZE] = {
      'name-text': {
        'focusIn': 37,
        'focusOut': -37
      },
      'icon': {
        'focusIn': 68,
        'focusOut': -100
      }
    };

    this.animationDistanceMapper[this.MEDIUM_WINDOW_SIZE] = {
      'name-text': {
        'focusIn': 45,
        'focusOut': -45
      },
      'icon': {
        'focusIn': 65,
        'focusOut': -100
      }
    };
    
    this.animationDistanceMapper[this.LARGE_WINDOW_SIZE] = {
      'name-text': {
        'focusIn': 53,
        'focusOut': -53
      },
      'icon': {
        'focusIn': 89,
        'focusOut': -130
      }
    };

    this.extraSmallWindowSize = 1340;
    this.smallWindowSize = 1440;
    this.lowerMediumWindowSize = 1540;
    this.mediumWindowSize = 1640;
    this.largeWindowSize = 1920;

    this.initDescriptionMapper();
    this.initNameMapper();
    this.initActionHolderMapper();
  }

  // #Public Functions#
  public getWindowSize() : string {
    if (window.innerWidth > this.mediumWindowSize) {
      return this.LARGE_WINDOW_SIZE;
    }
    if (window.innerWidth > this.smallWindowSize) {
      return this.MEDIUM_WINDOW_SIZE;
    }
    return this.SMALL_WINDOW_SIZE;
  }

  public getAnimationParameters(elementName:string, nodeScaleValue:string) : Object {
    let distanceY = elementName === 'name-text'
      ? this.animationDistanceMapper[this.getWindowSize()][elementName][nodeScaleValue]
      : this.animationDistanceMapper['standard-y'][elementName] && this.animationDistanceMapper['standard-y'][elementName][nodeScaleValue] || 0;

    let distanceX = ['1', '2', '3', '4'].indexOf(elementName) !== -1
      ? this.animationDistanceMapper[this.getWindowSize()]['icon'][nodeScaleValue]
      : 0;

    return {
      distanceX: distanceX + 'px',
      distanceY: distanceY + 'px'
    }
  }

  public getActionHolderRightValue(isHovered:boolean) : number {
    return this.findCoordinates(isHovered ? 'hovered': 'not-hovered', this.actionHolderMapper);
  }

  public getNameBottomValue(isHovered:boolean) : number {
    return this.findCoordinates(isHovered ? 'hovered': 'not-hovered', this.nameMapper);
  }
  
  public getDescriptionBottomValue(isHovered:boolean) : number {
    let descriptionOption = this.getDescriptionOption(isHovered);
    return this.findCoordinates(descriptionOption, this.descriptionMapper);
  }

  // #Private Functions#
  private getDescriptionOption(isHovered:boolean) : string {
    if (this.getWindowSize() === this.LARGE_WINDOW_SIZE) {
      return 'constant';
    }

    if (this.getWindowSize() === this.MEDIUM_WINDOW_SIZE) {
      return window.innerWidth <= this.lowerMediumWindowSize
        ? 'lower'
        : 'higher';
    }

    return isHovered ? 'hovered' : 'not-hovered';
  }

  private initDescriptionMapper() : void {

    const HOVERED_SMALL_SLOPE = 0.015;
    const HOVERED_SMALL_MAX = 3;
    const SMALL_SLOPE = 0.04;
    const SMALL_MAX = 4;

    const LOWER_MEDIUM_SLOPE = 0.0505050505050505;
    const LOWER_MEDIUM_MAX = 9;
    const HIGHER_MEDIUM_SLOPE = 0.0404040404040404;
    const HIGHER_MEDIUM_MAX = 13;

    const LARGE_SLOPE = 0.043010752688172;
    const LARGE_MAX = 20;

    this.descriptionMapper = {};
    
    this.descriptionMapper['hovered'] = {};
    this.descriptionMapper['hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: HOVERED_SMALL_SLOPE,
      max: HOVERED_SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };

    this.descriptionMapper['not-hovered'] = {};
    this.descriptionMapper['not-hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: SMALL_SLOPE,
      max: SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };


    this.descriptionMapper['lower'] = {};
    this.descriptionMapper['lower'][this.MEDIUM_WINDOW_SIZE] = {
      slope: LOWER_MEDIUM_SLOPE,
      max: LOWER_MEDIUM_MAX,
      maxWindowSize: this.lowerMediumWindowSize
    };

    this.descriptionMapper['higher'] = {};
    this.descriptionMapper['higher'][this.MEDIUM_WINDOW_SIZE] = {
      slope: HIGHER_MEDIUM_SLOPE,
      max: HIGHER_MEDIUM_MAX,
      maxWindowSize: this.mediumWindowSize
    };

    this.descriptionMapper['constant'] = {};
    this.descriptionMapper['constant'][this.LARGE_WINDOW_SIZE] = {
      slope: LARGE_SLOPE,
      max: LARGE_MAX,
      maxWindowSize: this.largeWindowSize
    };
  }

  private initNameMapper() : void {
    const HOVERED_EXTRA_SMALL_SLOPE = 0.06;
    const HOVERED_EXTRA_SMALL_MAX = 5;
    const EXTRA_SMALL_SLOPE = 0.04;
    const EXTRA_SMALL_MAX = 38;
    
    const HOVERED_SMALL_SLOPE = 0.0808080808080808;
    const HOVERED_SMALL_MAX = 13;
    const SMALL_SLOPE = 0.0454545454545455;
    const SMALL_MAX = 42.5;

    const HOVERED_LOWER_MEDIUM_SLOPE = 0.0808080808080808;
    const HOVERED_LOWER_MEDIUM_MAX = 12;
    const LOWER_MEDIUM_SLOPE = 0.0505050505050505;
    const LOWER_MEDIUM_MAX = 55;
    
    const HOVERED_MEDIUM_SLOPE = 0.0707070707070707;
    const HOVERED_MEDIUM_MAX = 19;
    const MEDIUM_SLOPE = 0.0303030303030303;
    const MEDIUM_MAX = 58;

    const HOVERED_LARGE_SLOPE = 0.0752688172043011;
    const HOVERED_LARGE_MAX = 32;
    const LARGE_SLOPE = 0.043010752688172;
    const LARGE_MAX = 74;

    this.nameMapper = {};
    
    this.nameMapper['hovered'] = {};
    this.nameMapper['hovered']['extra-small'] = {
      slope: HOVERED_EXTRA_SMALL_SLOPE,
      max: HOVERED_EXTRA_SMALL_MAX,
      maxWindowSize: this.extraSmallWindowSize
    };
    this.nameMapper['hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: HOVERED_SMALL_SLOPE,
      max: HOVERED_SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };
    this.nameMapper['hovered']['lower-medium'] = {
      slope: HOVERED_LOWER_MEDIUM_SLOPE,
      max: HOVERED_LOWER_MEDIUM_MAX,
      maxWindowSize: this.lowerMediumWindowSize
    };
    this.nameMapper['hovered'][this.MEDIUM_WINDOW_SIZE] = {
      slope: HOVERED_MEDIUM_SLOPE,
      max: HOVERED_MEDIUM_MAX,
      maxWindowSize: this.mediumWindowSize
    };
    this.nameMapper['hovered'][this.LARGE_WINDOW_SIZE] = {
      slope: HOVERED_LARGE_SLOPE,
      max: HOVERED_LARGE_MAX,
      maxWindowSize: this.largeWindowSize
    };

    this.nameMapper['not-hovered'] = {};
    this.nameMapper['not-hovered']['extra-small'] = {
      slope: EXTRA_SMALL_SLOPE,
      max: EXTRA_SMALL_MAX,
      maxWindowSize: this.extraSmallWindowSize
    };
    this.nameMapper['not-hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: SMALL_SLOPE,
      max: SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };
    this.nameMapper['not-hovered']['lower-medium'] = {
      slope: LOWER_MEDIUM_SLOPE,
      max: LOWER_MEDIUM_MAX,
      maxWindowSize: this.lowerMediumWindowSize
    };
    this.nameMapper['not-hovered'][this.MEDIUM_WINDOW_SIZE] = {
      slope: MEDIUM_SLOPE,
      max: MEDIUM_MAX,
      maxWindowSize: this.mediumWindowSize
    };
    this.nameMapper['not-hovered'][this.LARGE_WINDOW_SIZE] = {
      slope: LARGE_SLOPE,
      max: LARGE_MAX,
      maxWindowSize: this.largeWindowSize
    };
  }

  private initActionHolderMapper() : void {
    const HOVERED_SMALL_SLOPE = -0.29;
    const HOVERED_SMALL_MAX = -418;
    const SMALL_SLOPE = -0.215;
    const SMALL_MAX = -231;

    const HOVERED_MEDIUM_SLOPE = -0.3266331658291457;
    const HOVERED_MEDIUM_MAX = -483;
    const MEDIUM_SLOPE = -0.2412060301507538;
    const MEDIUM_MAX = -283;

    const HOVERED_LARGE_SLOPE = -0.3369175627240143;
    const HOVERED_LARGE_MAX = -577;
    const LARGE_SLOPE = -0.2544802867383513;
    const LARGE_MAX = -329;

    this.actionHolderMapper = {};
    
    this.actionHolderMapper['hovered'] = {};
    this.actionHolderMapper['hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: HOVERED_SMALL_SLOPE,
      max: HOVERED_SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };
    this.actionHolderMapper['hovered'][this.MEDIUM_WINDOW_SIZE] = {
      slope: HOVERED_MEDIUM_SLOPE,
      max: HOVERED_MEDIUM_MAX,
      maxWindowSize: this.mediumWindowSize
    };
    this.actionHolderMapper['hovered'][this.LARGE_WINDOW_SIZE] = {
      slope: HOVERED_LARGE_SLOPE,
      max: HOVERED_LARGE_MAX,
      maxWindowSize: this.largeWindowSize
    };

    this.actionHolderMapper['not-hovered'] = {};
    this.actionHolderMapper['not-hovered'][this.SMALL_WINDOW_SIZE] = {
      slope: SMALL_SLOPE,
      max: SMALL_MAX,
      maxWindowSize: this.smallWindowSize
    };
    this.actionHolderMapper['not-hovered'][this.MEDIUM_WINDOW_SIZE] = {
      slope: MEDIUM_SLOPE,
      max: MEDIUM_MAX,
      maxWindowSize: this.mediumWindowSize
    };
    this.actionHolderMapper['not-hovered'][this.LARGE_WINDOW_SIZE] = {
      slope: LARGE_SLOPE,
      max: LARGE_MAX,
      maxWindowSize: this.largeWindowSize
    };
  }

  private findCoordinates(option:string, coordinateMapper:object) : number {
    let windowSize = this.getProperWindowSize(option, coordinateMapper);
    return -1 * (((coordinateMapper[option][windowSize]['maxWindowSize'] - window.innerWidth) * coordinateMapper[option][windowSize]['slope']) - coordinateMapper[option][windowSize]['max']);
  }

  private getProperWindowSize(option:string, coordinateMapper:object) : string {
    return window.innerWidth > this.lowerMediumWindowSize
      ? this.getWindowSize()
      : window.innerWidth > this.smallWindowSize && coordinateMapper[option]['lower-medium'] !== undefined
        ? 'lower-medium'
        : window.innerWidth > this.extraSmallWindowSize 
          ? this.getWindowSize()
          : window.innerWidth <= this.extraSmallWindowSize && coordinateMapper[option]['extra-small'] !== undefined
            ? 'extra-small'
            : this.getWindowSize();
  }
}
