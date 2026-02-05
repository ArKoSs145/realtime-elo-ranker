import { PlayerService } from '../player/player.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly playerService;
    private readonly eventEmitter;
    constructor(playerService: PlayerService, eventEmitter: EventEmitter2);
    getRanking(): Promise<import("../player/player.entity").Player[]>;
    sse(): Observable<any>;
}
