import { useState } from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";

const Sports = () => {
  const [selectedSport, setSelectedSport] = useState<string>("Football"); // Default sport

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
      {/* Sidebar or aside */}
      <div className="md:col-span-1 p-5 bg-gray-800 rounded-lg">
        <SportsList onSelectSport={setSelectedSport} /> {/* Pass setter function */}
      </div>

      {/* Main Content Section */}
      <div className="md:col-span-4 p-5 bg-gray-800 rounded-lg">
        {/* Upcoming Matches */}
        <UpcomingMatches selectedSport={selectedSport} />

        {/* Live Matches */}
        <LiveMatches selectedSport={selectedSport} />
      </div>
    </div>
  );
};

export default Sports;
