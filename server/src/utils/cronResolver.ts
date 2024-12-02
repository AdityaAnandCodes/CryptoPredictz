import cron from "node-cron";
import matchService from "../services/matchService";
import aptosService from "../services/aptosService";
class MatchResolver {
  constructor() {
    // Run every 5 minutes
    cron.schedule("*/5 * * * *", () => {
      this.resolveExpiredMatches();
    });
  }
  async resolveExpiredMatches() {
    const now = new Date();
    const matches = (await matchService.getMatches()).filter((match) => !match.resolved && match.endTime <= now);
    for (const match of matches) {
      // Simulate match outcome (0 for home win, 1 for away win)
      const outcome = Math.random() > 0.5 ? 0 : 1;
      try {
        // Resolve in local service
        matchService.resolveMatch(match.id, outcome);
        // Resolve on Aptos contract
        await aptosService.resolveMarket(match.marketAddress, outcome);
        console.log(`Resolved match: ${match.homeTeam} vs ${match.awayTeam}, Outcome: ${outcome}`);
      } catch (error) {
        console.error(`Failed to resolve match ${match.id}:`, error);
      }
    }
  }
}
export default new MatchResolver();
