import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

describe('PlayerService', () => {
  let service: PlayerService;
  let repo: Repository<Player>;
  let eventEmitter: EventEmitter2;

  // Mock du Repository TypeORM
  const mockPlayerRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockReturnValue({ avg: 1500 }), // On simule une moyenne de 1500
    })),
  };

  // Mock de l'EventEmitter
  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repo = module.get<Repository<Player>>(getRepositoryToken(Player));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('doit être défini', () => {
    expect(service).toBeDefined();
  });

  it('doit créer un joueur avec le rang moyen existant', async () => {
    const playerId = 'NouveauJoueur';
    mockPlayerRepository.findOneBy.mockResolvedValue(null); // Le joueur n'existe pas encore
    mockPlayerRepository.create.mockReturnValue({ id: playerId, rank: 1500 });
    mockPlayerRepository.save.mockResolvedValue({ id: playerId, rank: 1500 });

    const result = await service.create(playerId);

    expect(result.rank).toBe(1500); // Doit utiliser la moyenne mockée (1500)
    expect(mockPlayerRepository.save).toHaveBeenCalled();
    expect(eventEmitter.emit).toHaveBeenCalledWith('ranking.update', { id: playerId, rank: 1500 });
  });
});