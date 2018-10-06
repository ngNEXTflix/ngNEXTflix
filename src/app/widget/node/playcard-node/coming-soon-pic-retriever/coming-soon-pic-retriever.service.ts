import { Injectable } from '@angular/core';

@Injectable()
export class ComingSoonPicRetrieverService {

	private static comingSoonPicArray: string[] = [
		'https://i.imgur.com/QjbzaKu.png',
		'https://i.imgur.com/TFLgTBd.png',
		'https://i.imgur.com/k4pNYkS.png',
		'https://i.imgur.com/aUVKoJR.png',
		'https://i.imgur.com/bqL4VCA.png'
		];

	private modulo: number;
	private constant: number;
	private categoryIndexDictionary: object;
	private categoryConstantDictionary: object;
	private categoryCounter: number;
	private idPicHashObject: object;
  constructor() {
	  this.modulo = ComingSoonPicRetrieverService.comingSoonPicArray.length;
	  this.constant = (this.modulo * this.modulo) + 1;
	  this.categoryIndexDictionary = {};
	  this.categoryConstantDictionary = {};
	  this.categoryCounter = 0;
	  this.idPicHashObject = {};
		// TODO: currently, if a user uses the carosel, the random generated pictures 
		// flash into a completely different coming soon picture. we need to retain
		// the original assigned coming soon picture to prevent the abrupt change
  }

	public getComingSoonPic(id: number, category: number) : string {
		let result;
		let categoryConstant;
		this.idPicHashObject[category] = this.idPicHashObject[category] || {};
		if (this.idPicHashObject[category][id]) {
			result = ComingSoonPicRetrieverService.comingSoonPicArray[this.idPicHashObject[category][id]];
		} else if (typeof this.categoryIndexDictionary[category] !== 'undefined' && 
			typeof this.categoryConstantDictionary[category] !== 'undefined') {
			categoryConstant = this.categoryConstantDictionary[category];
			const newIndex = this.performModulo(this.categoryIndexDictionary[category], categoryConstant);
			this.categoryIndexDictionary[category] = newIndex;
			result = ComingSoonPicRetrieverService.comingSoonPicArray[newIndex];
			this.idPicHashObject[category][id] = newIndex;
		} else {
			categoryConstant = this.getNewConstant();
			this.categoryCounter = this.performModulo(this.categoryCounter, categoryConstant);
			this.categoryConstantDictionary[category] = categoryConstant;
			this.categoryIndexDictionary[category] = this.categoryCounter;
			result = ComingSoonPicRetrieverService.comingSoonPicArray[this.categoryCounter];
			this.idPicHashObject[category][id] = this.categoryCounter;
		}
		return result;
	}

	private performModulo(currentIndex: number, constant: number) : number {
		return (currentIndex + constant) % this.modulo;
	}

	private getNewConstant() : number {
		let result = this.rollNewConstant();
		if (result % this.modulo === 0) {
			result = this.getNewConstant();
		}
		return result;
	}

	private rollNewConstant() : number {
		return Math.floor(Math.random() * this.modulo + 1);
	}
}