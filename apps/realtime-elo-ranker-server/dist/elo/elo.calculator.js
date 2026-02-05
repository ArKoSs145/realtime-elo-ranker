"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EloCalculator = void 0;
class EloCalculator {
    static K = 32;
    static getExpectedScore(rankA, rankB) {
        return 1 / (1 + Math.pow(10, (rankB - rankA) / 400));
    }
    static calculateNewRanks(rankA, rankB, result) {
        const expectedA = this.getExpectedScore(rankA, rankB);
        const expectedB = this.getExpectedScore(rankB, rankA);
        let scoreA = 0;
        let scoreB = 0;
        if (result === 'A_WIN') {
            scoreA = 1;
            scoreB = 0;
        }
        else if (result === 'B_WIN') {
            scoreA = 0;
            scoreB = 1;
        }
        else {
            scoreA = 0.5;
            scoreB = 0.5;
        }
        return {
            newRankA: Math.round(rankA + this.K * (scoreA - expectedA)),
            newRankB: Math.round(rankB + this.K * (scoreB - expectedB)),
        };
    }
}
exports.EloCalculator = EloCalculator;
//# sourceMappingURL=elo.calculator.js.map