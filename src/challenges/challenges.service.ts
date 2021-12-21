import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create-challenge-dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { UpdateGameDto } from './dtos/update-game-dto';
import {
  Challenge,
  ChallengeStatus,
  Game,
} from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<Challenge>,
    @InjectModel('Game')
    private readonly gameModel: Model<Game>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createChallenge(data: CreateChallengeDto): Promise<Challenge> {
    const isValidPlayers = await this.playersService.getSomePlayers([
      data.challenger,
      ...data.players,
    ]);
    if (isValidPlayers.length !== 3) {
      throw new BadRequestException('players not found');
    }

    const isValidCategory = await this.categoriesService.getById(data.category);
    if (!isValidCategory) {
      throw new BadRequestException('category not found');
    }
    console.log(data);
    const newChallenge = new this.challengeModel(data);
    newChallenge.dateTimeSolicitation = new Date();
    newChallenge.category = data.category;
    newChallenge.status = ChallengeStatus.PENDENTE;
    return await newChallenge.save();
  }

  async getAll(): Promise<Challenge[]> {
    return await this.challengeModel
      .find()
      .populate('challenger')
      .populate('players')
      .populate('game')
      .exec();
  }
  async getByPlayerId(id: string): Promise<Challenge[]> {
    const isValidPlayer = await this.playersService.getById(id);
    if (!isValidPlayer) {
      throw new BadRequestException('player not found');
    }
    return await this.challengeModel
      .find()
      .where('players')
      .in([id])
      .populate('challenger')
      .populate('players')
      .exec();
  }

  async update(_id: string, input: UpdateChallengeDto): Promise<void> {
    await this.challengeModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          dateTimeChallenge: input.dateTimeChallenge,
          status: input.status,
        },
      },
    );
  }

  async updateGame(_id: string, input: UpdateGameDto): Promise<void> {
    const isChallenge = await this.challengeModel.findOne({ _id }).exec();
    if (!isChallenge) {
      throw new BadRequestException('challenge not found');
    }

    const isValidDef = isChallenge.players.filter((p) => p._id == input.def);
    if (!isValidDef) {
      throw new BadRequestException('player not found in challenge');
    }

    const createdGame = new this.gameModel(input);
    createdGame.category = isChallenge.category;
    createdGame.players = [...isChallenge.players];
    const game = await createdGame.save();

    await this.challengeModel.findOneAndUpdate(
      { _id },
      {
        $set: { game },
      },
    );
  }
}
