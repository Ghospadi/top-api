import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategories {
  Courser,
  Services,
  Books,
  Products,
}

export class HhData {
  @prop()
  count: number;

  @prop()
  Junior: number;

  @prop()
  Middle: number;

  @prop()
  Senior: number;
}

export class TopPageAdvantages {
  @prop()
  title: string;

  @prop()
  description: string;
}

export interface TopPageModel extends Base {}

@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategories })
  firstCategory: TopLevelCategories;

  @prop()
  secondCategory: string;

  @prop()
  title: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  category: string;

  @prop({ type: () => [HhData] })
  hh?: HhData;

  @prop({ type: () => [TopPageAdvantages] })
  advantages: TopPageAdvantages[];

  @prop()
  SEOText: string;

  @prop()
  tagsTitle?: string;

  @prop({ type: () => [String] })
  tags: string[];
}
