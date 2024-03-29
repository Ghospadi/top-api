import {CreateReviewDto} from './dto/create-review.dto';
import {ReviewModel} from './review.model/review.model';
import {Injectable} from '@nestjs/common';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {InjectModel} from 'nestjs-typegoose';
import {Types} from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(ReviewModel) private reviewModel: ModelType<ReviewModel>,
    ) {
    }

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({productId: new Types.ObjectId(productId)}).exec();
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        return this.reviewModel.find({productId: new Types.ObjectId(productId)}).exec();
    }
}
