import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { REVIEW_NOT_FOUND } from './dto/review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@Controller('review')
export class ReviewController {

  constructor(private readonly ReviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAllById(@Param('productId') productId: string) {
    return this.ReviewService.deleteByProductId(productId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string, @UserEmail() email: string) {
    return this.ReviewService.findByProductId(productId);
  }
}
