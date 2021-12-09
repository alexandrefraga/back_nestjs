import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category-dto';
import { UpdateCategoryDto } from './dtos/update-category-dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
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
    return await this.categoryModel.find().populate('players').exec();
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

  async update(id: string, data: UpdateCategoryDto): Promise<void> {
    const existentCategory = await this.categoryModel
      .findOne({ _id: id })
      .exec();
    if (existentCategory) {
      await this.categoryModel
        .findOneAndUpdate({ _id: id }, { $set: data })
        .exec();
    } else {
      throw new NotFoundException('player not found');
    }
  }

  async addPlayer(categoryId, playerId): Promise<void> {
    const existCategory = await this.categoryModel.findById(categoryId).exec();
    if (!existCategory) {
      throw new NotFoundException('category not found');
    }

    await this.playersService.getById(playerId);

    const existPlayerInCategory = existCategory.players.includes(playerId);
    if (existPlayerInCategory) {
      throw new BadRequestException(
        'this player already exists in the category',
      );
    }
    existCategory.players.push(playerId);
    await this.categoryModel
      .findOneAndUpdate({ _id: categoryId }, { $set: existCategory })
      .exec();
  }
}
