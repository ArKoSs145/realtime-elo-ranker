import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from './match.entity';
import { PlayerService } from '../player/player.service';
import { CreateMatchDto } from './create-match.dto';
export declare class MatchService {
    private matchRepository;
    private playerService;
    private eventEmitter;
    constructor(matchRepository: Repository<Match>, playerService: PlayerService, eventEmitter: EventEmitter2);
    recordMatch(dto: CreateMatchDto): Promise<{
        winner: import("../player/player.entity").Player;
        loser: import("../player/player.entity").Player;
    }>;
}
