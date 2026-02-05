import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from './player.entity';
export declare class PlayerService {
    private playerRepository;
    private eventEmitter;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    create(id: string): Promise<Player>;
    save(player: Player): Promise<Player>;
}
