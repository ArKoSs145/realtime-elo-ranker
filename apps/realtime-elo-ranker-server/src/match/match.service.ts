import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { CreateMatchDto } from './create-match.dto';
import { EloCalculator } from '../elo/elo.calculator';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    private playerService: PlayerService,
    private eventEmitter: EventEmitter2,
  ) {}

  async recordMatch(dto: CreateMatchDto) {
    const p1 = await this.playerService.findOne(dto.winner);
    const p2 = await this.playerService.findOne(dto.loser);

    if (!p1 || !p2) {
      throw new UnprocessableEntityException('Joueur introuvable');
    }

    const { newRankA, newRankB } = EloCalculator.calculateNewRanks(
      p1.rank,
      p2.rank,
      dto.draw ? 'DRAW' : 'A_WIN',
    );

    p1.rank = newRankA;
    p2.rank = newRankB;
    await this.playerService.save(p1);
    await this.playerService.save(p2);

    await this.matchRepository.save(
      this.matchRepository.create({
        winnerId: p1.id,
        loserId: p2.id,
        isDraw: dto.draw,
      }),
    );

    this.eventEmitter.emit('ranking.update', { id: p1.id, rank: p1.rank });
    this.eventEmitter.emit('ranking.update', { id: p2.id, rank: p2.rank });

    return { winner: p1, loser: p2 };
  }
}
