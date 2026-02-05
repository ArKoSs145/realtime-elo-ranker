export class EloCalculator {
  private static readonly K = 32;

  private static getExpectedScore(rankA: number, rankB: number): number {
    return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
  }

  static calculateNewRanks(
    rankA: number,
    rankB: number,
    result: 'A_WIN' | 'B_WIN' | 'DRAW',
  ): { newRankA: number; newRankB: number } {
    const expectedA = this.getExpectedScore(rankA, rankB);
    const expectedB = this.getExpectedScore(rankB, rankA);

    let scoreA = 0;
    let scoreB = 0;

    if (result === 'A_WIN') { scoreA = 1; scoreB = 0; }
    else if (result === 'B_WIN') { scoreA = 0; scoreB = 1; }
    else { scoreA = 0.5; scoreB = 0.5; }

    return {
      newRankA: Math.round(rankA + this.K * (scoreA - expectedA)),
      newRankB: Math.round(rankB + this.K * (scoreB - expectedB)),
    };
  }
}
