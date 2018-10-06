import { IPlaycardTemplate } from './IPlaycardTemplate';
import { IPlaycardImages } from './IPlaycardImages';

export interface IPlayCard {
    id: number;
    seVisible: number;
    name: string;
    desc: string;
    type: string;
    section: string;
    challenge: string;
    solution: string;
    pic: Array<string>;
    video: string;
    info: string;
    implement: string;
    indication: string;
    createdAt: string;
    updatedAt: string;
    card_status: string;
    keywords: string;
    TemplateEditorAccount: IPlaycardTemplate;
    PlaycardImages: IPlaycardImages[]
}
