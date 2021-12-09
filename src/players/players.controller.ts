import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { MissingParamValidationPipe } from '../common/pipes/missing-param-validation.pipes';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayer: CreatePlayerDto): Promise<void> {
    await this.playersService.createPlayer(createPlayer);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayer: UpdatePlayerDto,
    @Param('id', MissingParamValidationPipe) id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(id, updatePlayer);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }

  @Get('/:id')
  async getPlayer(
    @Param('id', MissingParamValidationPipe)
    id: string,
  ): Promise<Player> {
    return this.playersService.getById(id);
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', MissingParamValidationPipe)
    id: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(id);
  }
}
