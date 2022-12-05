import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { REVIEW_NOT_FOUND } from './dto/review.constants';

@Controller('review')
export class ReviewController {

  constructor(private readonly ReviewService: ReviewService) {}
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.ReviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.ReviewService.delete(id);
    if(!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    return deletedDoc;
  }

  @Delete(':id')
  async deleteAllById(@Param('productId') productId: string) {
    return this.ReviewService.deleteByProductId(productId)
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.ReviewService.findByProductId(productId);
  }
}
