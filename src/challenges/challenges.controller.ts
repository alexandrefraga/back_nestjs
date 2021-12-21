import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MissingParamValidationPipe } from 'src/common/pipes/missing-param-validation.pipes';

import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge-dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { UpdateGameDto } from './dtos/update-game-dto';
import { Challenge } from './interfaces/challenge.interface';

@Controller('api/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() input: CreateChallengeDto): Promise<Challenge> {
    return this.challengesService.createChallenge(input);
  }

  @Get()
  async getAll(
    @Query('playerId')
    id: string,
  ): Promise<Challenge[]> {
    if (id) {
      return await this.challengesService.getByPlayerId(id);
    }
    return await this.challengesService.getAll();
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateChallenge(
    @Param('id', MissingParamValidationPipe) challengeId: string,
    @Body() input: UpdateChallengeDto,
  ): Promise<void> {
    return await this.challengesService.update(challengeId, input);
  }

  @Put('/:challengeId/game')
  @UsePipes(ValidationPipe)
  async updateGame(
    @Param('challengeId', MissingParamValidationPipe) id: string,
    @Body() input: UpdateGameDto,
  ): Promise<void> {
    return await this.challengesService.updateGame(id, input);
  }
}
