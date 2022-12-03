export enum TopLevelCategories {
	Courser,
	Services,
	Books,
	Products
}

export interface Salaries {
	Junior: number;
	Middle: number;
	Senior: number;
}

export interface Advantages {
	title: string;
	description: string;
}

export class TopPageModel {
	firstCategory: TopLevelCategories;
	secondCategory: string;
	title: string;
	category: string;
	hh?: {
		count: number;
		salaries: Salaries;
	};
	advantages: Advantages[];
	SEOText: string;
	tagsTitle?: string;
	tags: string[];
}
