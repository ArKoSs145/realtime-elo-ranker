import { Controller, Get, NotFoundException, Sse } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get()
  async getRanking() {
    const players = await this.playerService.findAll();
    if (!players.length) throw new NotFoundException('Aucun joueur');
    return players;
  }

  @Sse('events')
  sse(): Observable<any> {
    return fromEvent(this.eventEmitter, 'ranking.update').pipe(
      map((data) => ({
        data: { type: 'RankingUpdate', player: data },
      })),
    );
  }
}
