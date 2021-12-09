import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MissingParamValidationPipe } from 'src/common/pipes/missing-param-validation.pipes';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { UpdateCategoryDto } from './dtos/update-category-dto';
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

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('id', MissingParamValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Post('/:categoryId/player/:playerId')
  async addPlayerInCategory(
    @Param() { categoryId, playerId }: { categoryId: string; playerId: string },
  ): Promise<void> {
    return await this.categoriesService.addPlayer(categoryId, playerId);
  }
}
