import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(data: CreatePlayerDto): Promise<void> {
    const existentPlayer = await this.playerModel
      .findOne({
        email: data.email,
      })
      .exec();
    if (existentPlayer) {
      throw new BadRequestException('e-mail already registered');
    } else {
      await this.create(data);
    }
  }

  async updatePlayer(_id, data: CreatePlayerDto): Promise<void> {
    const existentPlayer = await this.playerModel.findOne({ _id }).exec();
    if (existentPlayer) {
      await this.update(_id, data);
    } else {
      throw new NotFoundException('player not found');
    }
  }

  async getById(id: string): Promise<Player> {
    const existentPlayer = await this.playerModel.findOne({ _id: id }).exec();
    if (!existentPlayer) {
      throw new NotFoundException('id não encontrado');
    }
    return existentPlayer;
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async deletePlayer(_id: string): Promise<any> {
    return await this.playerModel.deleteOne({ _id }).exec();
  }

  private async create(data: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(data);
    return await newPlayer.save();
  }

  private async update(_id, data: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        {
          _id,
        },
        {
          $set: data,
        },
      )
      .exec();
  }
}
