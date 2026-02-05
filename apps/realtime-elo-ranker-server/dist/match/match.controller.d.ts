import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    recordMatch(dto: CreateMatchDto): Promise<{
        winner: import("../player/player.entity").Player;
        loser: import("../player/player.entity").Player;
    }>;
}
