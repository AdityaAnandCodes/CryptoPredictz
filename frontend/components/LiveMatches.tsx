import React from "react";
import { BettingCardDummy } from "@/constants";
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
  sortOption: string;
}

const LiveMatches: React.FC<LiveMatchesProps> = ({ selectedSport, searchQuery, sortOption }) => {
  // Utility to parse "TODAY, HH:MM" or other dates
  const parseDate = (dateStr: string): Date => {
    const today = new Date();

    if (dateStr.toLowerCase().startsWith("today")) {
      const timePart = dateStr.split(",")[1]?.trim();
      if (timePart) {
        const [hours, minutes] = timePart.split(":").map(Number);
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
      }
      return today;
    }

    if (dateStr.toLowerCase().startsWith("tomorrow")) {
      const timePart = dateStr.split(",")[1]?.trim();
      if (timePart) {
        const [hours, minutes] = timePart.split(":").map(Number);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), hours, minutes);
      }
      return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    }

    if (dateStr.toLowerCase().startsWith("next week")) {
      const timePart = dateStr.split(",")[1]?.trim();
      if (timePart) {
        const [hours, minutes] = timePart.split(":").map(Number);
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), hours, minutes);
      }
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return nextWeek;
    }

    if (dateStr.toLowerCase().startsWith("next month")) {
      const timePart = dateStr.split(",")[1]?.trim();
      if (timePart) {
        const [hours, minutes] = timePart.split(":").map(Number);
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
        return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1, hours, minutes);
      }
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      return nextMonth;
    }

    return new Date(dateStr); // Default parsing for absolute date strings
  };

  // Filter matches based on selected sport and search query
  const filteredMatches = Object.values(BettingCardDummy)
    .flat()
    .filter(
      (match: Match) =>
        (selectedSport === "All Matches" || match.game.toLowerCase().includes(selectedSport.toLowerCase())) &&
        (match.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
          match.location.toLowerCase().includes(searchQuery.toLowerCase())),
    );

  // Sort matches based on the selected option
  const sortedMatches = filteredMatches.sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.game.localeCompare(b.game);
      case "time": {
        const dateA = parseDate(a.when);
        const dateB = parseDate(b.when);
        return dateA.getTime() - dateB.getTime();
      }
      case "teamA":
        return a.teamA.localeCompare(b.teamA);
      case "teamB":
        return b.teamB.localeCompare(a.teamB);
      default:
        return 0;
    }
  });

  return (
    <div className="text-white p-4 pt-2">
      <h2 className="text-xl font-semibold text-white mb-4">🔥 Live Matches</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {sortedMatches.map((match, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mb-4">
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
