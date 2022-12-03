import { Characteristics, Price } from "./product.interface";

export class ProductModel {
	_id: string;
	image: string;
	title: string;
	price: Price;
	description: string;
	calculatedRating: number;
	advantages: string;
	disadvantages: string;
	categories: string[];
	tags: string[];
	characteristics: Characteristics;
}
