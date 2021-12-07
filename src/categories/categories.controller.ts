import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MissingParamValidationPipe } from 'src/shared/pipes/missing-param-validation.pipes';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { Category } from './interfaces/category.interface';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoriesService.getAll();
  }

  @Get('/:id')
  async getCategory(
    @Param('id', MissingParamValidationPipe)
    id: string,
  ): Promise<Category> {
    return this.categoriesService.getById(id);
  }
}
