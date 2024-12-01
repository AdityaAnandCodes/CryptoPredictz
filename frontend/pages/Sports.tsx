import { useState } from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";

const Sports = () => {
  const [selectedSport, setSelectedSport] = useState<string>("All Matches"); // Default sport
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      {/* Sidebar or aside */}
      <div className="md:col-span-1 p-5 bg-gray-800 rounded-lg">
        <SportsList onSelectSport={setSelectedSport} /> {/* Pass setter function */}
      </div>

      {/* Main Content Section */}
      <div className="md:col-span-4 p-5 bg-gray-800 rounded-lg">
        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Upcoming Matches */}
        <UpcomingMatches selectedSport={selectedSport} searchQuery={searchQuery} />

        {/* Live Matches */}
        <LiveMatches selectedSport={selectedSport} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Sports;
