import React from "react";
import { BettingCardDummy } from "@/constants"; // Assuming your match data is coming from here
import BettingCard from "./BettingCard";

interface Match {
  game: string;
  location: string;
  when: string;
  teamA: string;
  teamB: string;
  teamAImage: string;
  teamBImage: string;
  odds: number[];
}

interface LiveMatchesProps {
  selectedSport: string;
  searchQuery: string;
}

const LiveMatches: React.FC<LiveMatchesProps> = ({ selectedSport, searchQuery }) => {
  // If the selected sport is "All Matches", show all matches without filtering by sport
  const filteredMatches = Object.values(BettingCardDummy)
    .flat()
    .filter(
      (match: Match) =>
        // If selected sport is "All Matches", do not filter by sport
        (selectedSport === "All Matches" || match.game.toLowerCase().includes(selectedSport.toLowerCase())) &&
        (match.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.location.toLowerCase().includes(searchQuery.toLowerCase())), // Search in game, teams, or location
    );

  return (
    <div className="text-white p-4 pt-2">
      <h2 className="text-xl font-semibold text-white mb-4">🔥 Live Matches</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {filteredMatches.map((match, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mb-4">
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
};

export default LiveMatches;
