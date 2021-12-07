import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

const URI = 'mongodb://localhost:27017/api-ranking';

@Module({
  imports: [MongooseModule.forRoot(URI), PlayersModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
