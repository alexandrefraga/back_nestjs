import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

// const URI_Local = 'mongodb://localhost:27017/api-ranking';
const URI = '';

@Module({
  imports: [MongooseModule.forRoot(URI), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
