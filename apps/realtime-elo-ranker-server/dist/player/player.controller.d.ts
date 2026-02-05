import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    create(dto: CreatePlayerDto): Promise<import("./player.entity").Player>;
}
