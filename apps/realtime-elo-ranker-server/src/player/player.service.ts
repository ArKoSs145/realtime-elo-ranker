import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter'; // <--- Import ajouté
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eventEmitter: EventEmitter2, // <--- Injection ajoutée
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({ order: { rank: 'DESC' } });
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async create(id: string): Promise<Player> {
    const existing = await this.findOne(id);
    if (existing) {
      throw new ConflictException('Le joueur existe déjà');
    }

    // Calcul du rang initial (moyenne ou 1200)
    const { avg } = await this.playerRepository
      .createQueryBuilder('player')
      .select('AVG(player.rank)', 'avg')
      .getRawOne();
    
    const initialRank = avg ? Math.round(avg) : 1200;

    const player = this.playerRepository.create({ id, rank: initialRank });
    const savedPlayer = await this.playerRepository.save(player);

    // <--- NOUVEAU : On prévient tout le monde qu'un joueur est arrivé
    this.eventEmitter.emit('ranking.update', { id: savedPlayer.id, rank: savedPlayer.rank });

    return savedPlayer;
  }

  async save(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }
}