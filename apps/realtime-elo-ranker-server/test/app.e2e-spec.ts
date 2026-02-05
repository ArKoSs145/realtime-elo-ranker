import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Important pour valider les DTOs
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('SCENARIO: Créer 2 joueurs, jouer un match, vérifier le classement', async () => {
    // 1. Créer le Joueur A
    await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: 'JoueurA' })
      .expect(201);

    // 2. Créer le Joueur B
    await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: 'JoueurB' })
      .expect(201);

    // 3. Vérifier qu'ils sont bien là (rank 1200 par défaut car c'est le début)
    const rankingRes = await request(app.getHttpServer())
      .get('/api/ranking')
      .expect(200);
    
    expect(rankingRes.body).toHaveLength(2);
    expect(rankingRes.body[0].rank).toBe(1200);

    // 4. Jouer un match (JoueurA gagne contre JoueurB)
    await request(app.getHttpServer())
      .post('/api/match')
      .send({
        winner: 'JoueurA',
        loser: 'JoueurB',
        draw: false
      })
      .expect(201);

    // 5. Vérifier le nouveau classement
    const finalRanking = await request(app.getHttpServer())
      .get('/api/ranking')
      .expect(200);
    
    const playerA = finalRanking.body.find((p) => p.id === 'JoueurA');
    const playerB = finalRanking.body.find((p) => p.id === 'JoueurB');

    // A a gagné => Rank > 1200
    expect(playerA.rank).toBeGreaterThan(1200);
    // B a perdu => Rank < 1200
    expect(playerB.rank).toBeLessThan(1200);
  });
});