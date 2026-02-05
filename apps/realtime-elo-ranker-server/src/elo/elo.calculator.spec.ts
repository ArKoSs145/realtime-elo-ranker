import { EloCalculator } from './elo.calculator';

describe('EloCalculator', () => {
  it('doit calculer correctement les nouveaux rangs (1200 vs 800)', () => {
    
    const rankA = 1200;
    const rankB = 800;
    
    // Joueur A (1200) gagne
    const result = EloCalculator.calculateNewRanks(rankA, rankB, 'A_WIN');

    expect(result.newRankA).toBe(1203); // 1200 + 3
    expect(result.newRankB).toBe(797);  // 800 - 3
  });

  it('doit gérer le match nul', () => {
    const rankA = 1200;
    const rankB = 1200; 

    const result = EloCalculator.calculateNewRanks(rankA, rankB, 'DRAW');

    expect(result.newRankA).toBe(1200);
    expect(result.newRankB).toBe(1200);
  });
});