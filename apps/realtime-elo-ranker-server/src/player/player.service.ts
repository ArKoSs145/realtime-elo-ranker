import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({ order: { rank: 'DESC' } });
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async create(id: string): Promise<Player> {
    const existing = await this.findOne(id);
    if (existing) throw new ConflictException('Le joueur existe déjà');

    const { avg } = await this.playerRepository
      .createQueryBuilder('player')
      .select('AVG(player.rank)', 'avg')
      .getRawOne();
    
    const initialRank = avg ? Math.round(avg) : 1200;

    const player = this.playerRepository.create({ id, rank: initialRank });
    return this.playerRepository.save(player);
  }

  async save(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }
}
