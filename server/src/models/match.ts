export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  group: string;
  startTime: Date;
  endTime: Date;
  marketAddress: string;
  resolved: boolean;
  outcome?: number; // 0 for home win, 1 for away win
}
