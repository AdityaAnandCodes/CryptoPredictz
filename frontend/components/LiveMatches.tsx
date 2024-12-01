import BettingCard from "./BettingCard";
import { BettingCardDummy } from "@/constants";

export default function LiveMatches() {
  return (
    <div className="text-white p-4 pt-2">
      <h2 className="text-xl font-semibold  text-white mb-4">🔥Live Matches</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {" "}
        {BettingCardDummy.map((match, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mb-4">
            {" "}
            {/* Adjusted width for bigger cards */}
            <BettingCard
              title={match.game}
              time={match.when}
              team1={match.teamA}
              team1Image={match.teamAImage}
              team2={match.teamB}
              team2Image={match.teamBImage}
              odds={match.odds}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
