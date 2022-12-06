import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TopLevelCategories } from "../top-page.model/top-page.model";

export class HhData {
    @IsNumber()
    count: number;

    @IsNumber()
    Junior: number;

    @IsNumber()
    Middle: number;

    @IsNumber()
    Senior: number;
}

export class TopPageAdvantages {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class CreateTopPageDto{
    @IsEnum(TopLevelCategories)
    firstCategory: TopLevelCategories;

    @IsString()
    secondCategory: string;

    @IsString()
    title: string;

    @IsString()
    alias: string;

    @IsString()
    category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => HhData)
    hh?: HhData;

    @IsArray()
	@ValidateNested()
    @Type(() => TopPageAdvantages)
    advantages: TopPageAdvantages[];

    @IsString()
    SEOText: string;

    @IsString()
    tagsTitle?: string;

	@IsArray()
	@IsString({each: true})
    tags: string[];
}