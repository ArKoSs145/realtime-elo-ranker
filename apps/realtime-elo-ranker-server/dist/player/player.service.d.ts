import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayerService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    create(id: string): Promise<Player>;
    save(player: Player): Promise<Player>;
}
