import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [RankingController],
})
export class RankingModule {}
