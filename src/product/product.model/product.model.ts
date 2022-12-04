import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class ProductCharacteristic {
	@prop()
	name: string;

	@prop()
	value: string;
}

export class ProducePrice {
	@prop()
	oldPrice: number;

	@prop()
	newPrice: number;

	@prop()
	credit: number;
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
	@prop()
	image: string;

	@prop()
	title: string;

	@prop({ type: () => Number })
	price: ProducePrice;
	
	@prop()
	description: string;

	@prop()
	calculatedRating: number;

	@prop()
	advantages: string;

	@prop()
	disadvantages: string;

	@prop({ type: () => [String]})
	categories: string[];

	@prop({ type: () => [String]})
	tags: string[];

	@prop({ type: () => [ProductCharacteristic], _id: false})
	characteristics: ProductCharacteristic;
}
