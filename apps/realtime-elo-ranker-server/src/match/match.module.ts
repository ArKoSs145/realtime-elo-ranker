import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), PlayerModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
