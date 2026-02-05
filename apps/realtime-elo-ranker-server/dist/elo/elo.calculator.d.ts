export declare class EloCalculator {
    private static readonly K;
    private static getExpectedScore;
    static calculateNewRanks(rankA: number, rankB: number, result: 'A_WIN' | 'B_WIN' | 'DRAW'): {
        newRankA: number;
        newRankB: number;
    };
}
