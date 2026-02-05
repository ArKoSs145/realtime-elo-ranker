"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const player_entity_1 = require("./player.entity");
let PlayerService = class PlayerService {
    playerRepository;
    eventEmitter;
    constructor(playerRepository, eventEmitter) {
        this.playerRepository = playerRepository;
        this.eventEmitter = eventEmitter;
    }
    async findAll() {
        return this.playerRepository.find({ order: { rank: 'DESC' } });
    }
    async findOne(id) {
        return this.playerRepository.findOneBy({ id });
    }
    async create(id) {
        const existing = await this.findOne(id);
        if (existing) {
            throw new common_1.ConflictException('Le joueur existe déjà');
        }
        const { avg } = await this.playerRepository
            .createQueryBuilder('player')
            .select('AVG(player.rank)', 'avg')
            .getRawOne();
        const initialRank = avg ? Math.round(avg) : 1200;
        const player = this.playerRepository.create({ id, rank: initialRank });
        const savedPlayer = await this.playerRepository.save(player);
        this.eventEmitter.emit('ranking.update', { id: savedPlayer.id, rank: savedPlayer.rank });
        return savedPlayer;
    }
    async save(player) {
        return this.playerRepository.save(player);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map