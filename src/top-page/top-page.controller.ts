import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model/top-page.model';
import { TOP_PAGE_NOT_FOUND } from './dto/top-page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = this.topPageService.getById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = this.topPageService.getByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const topPage = await this.topPageService.deleteById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    const topPage = await this.topPageService.updateById(id, dto);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategories(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
