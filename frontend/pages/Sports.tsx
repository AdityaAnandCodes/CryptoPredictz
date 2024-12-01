import { useState } from "react";
import SportsList from "@/components/SportsList";
import UpcomingMatches from "@/components/UpcomingMatches";
import LiveMatches from "@/components/LiveMatches";
import Navbar from "@/components/Navbar";
import Navmini from "@/components/Navmini";


const Sports = () => {
  const [selectedSport, setSelectedSport] = useState<string>("All Matches");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("name"); // Default sorting by name

  return (
    <>
      <Navbar />
      <Navmini />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
        {/* Sidebar or aside */}
        <div className="md:col-span-1 p-2 bg-black min-h-screen max-sm:min-h-fit bg-opacity-50 rounded-3xl">
          <SportsList onSelectSport={setSelectedSport} />
        </div>

        {/* Main Content Section */}
        <div className="md:col-span-4 p-2 bg-opacity-50 min-h-screen bg-black rounded-lg">
          {/* Search and Sort Bar */}
          <div className="flex gap-3 max-sm:gap-0 sm:flex-row max-sm:flex-col max-sm:items-start mb-4 mt-16 max-sm:mt-4 max-sm:px-4  g-3">
            <input
              type="text"
              className="w-full sm:w-2/3 max-sm:w-full max-sm:mt-0 max-sm:mb-3 h-10 p-2 bg-gray-700 text-white rounded-lg"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-1/3 max-sm:w-full max-sm:mt-3 h-10 p-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>

          {/* Live Matches */}
          <UpcomingMatches selectedSport={selectedSport} searchQuery={searchQuery} sortOption={sortOption} />
          <LiveMatches selectedSport={selectedSport} searchQuery={searchQuery} sortOption={sortOption} />
        </div>
      </div>
    </>
  );
};

export default Sports;
