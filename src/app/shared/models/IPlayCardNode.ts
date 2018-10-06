import { INode } from './INode';

export interface IPlayCardNode extends INode {
	isHovered: boolean;
  isNodeScaleAnimating: boolean;
  nodeScaleValue: string;
  isPlayInPptBuilder: boolean;
  isPlayInFavorites: boolean;
}
