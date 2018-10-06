import { IPlayCard } from './IPlayCard';
import { INodeType } from './INodeType';

export interface INode {
    id: number;
    parentId: number;
    nodeTypeId: number;
    playcardId: number;
    orderIndex: number;
    name: string;
    settings: string;
    imageUrl: string;
    PlayCard: IPlayCard;
    NodeType: INodeType;
    children: INode[];
}
