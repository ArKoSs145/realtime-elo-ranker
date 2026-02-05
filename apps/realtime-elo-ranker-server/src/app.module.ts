import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';
import { Player } from './player/player.entity';
import { Match } from './match/match.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'elo.db',
      entities: [Player, Match],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    PlayerModule,
    MatchModule,
    RankingModule,
  ],
})
export class AppModule {}
