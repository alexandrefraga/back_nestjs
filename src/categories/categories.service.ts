import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const { category } = data;
    const alreadyExists = await this.categoryModel.findOne({ category });
    if (alreadyExists) {
      throw new BadRequestException(`Already exist category.`);
    }
    const createdCategory = new this.categoryModel(data);
    return await createdCategory.save();
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async getById(id: string): Promise<Category> {
    const existentCategory = await this.categoryModel
      .findOne({ _id: id })
      .exec();
    if (!existentCategory) {
      throw new NotFoundException('id não encontrado');
    }
    return existentCategory;
  }
}
